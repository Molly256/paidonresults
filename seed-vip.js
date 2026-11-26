import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
const P = 'pod:';
const VIPS = {
  0: { tasks: 3, perTask: 500 },
  1: { tasks: 2, perTask: 900 },
  2: { tasks: 6, perTask: 1000 },
  3: { tasks: 20, perTask: 950 },
  4: { tasks: 30, perTask: 834 },
  5: { tasks: 40, perTask: 725 },
  6: { tasks: 50, perTask: 900 },
  7: { tasks: 60, perTask: 1150 },
};
function shuffle(a){const arr=[...a];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
function getUgandaDateString(){return new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Kampala'})}
async function getTasksFromDataJs(){
  const mod = await import('./data/tasks.js');
  return mod.default || mod.tasks || mod.TASKS || [];
}
async function assignTasksToUser(phone,vipLevel,today,pipeline){
  const selectedVip=VIPS[vipLevel];
  const allTasks=await getTasksFromDataJs();
  const shuffled=shuffle(allTasks);
  const tasksToAssign=shuffled.slice(0,selectedVip.tasks);
  const unlockedTasks=tasksToAssign.map(b=>String(b.taskId || b.id || b._id));
  tasksToAssign.forEach(b=>{
    const taskId=String(b.taskId || b.id || b._id);
    pipeline.hset(`${P}task:${phone}:${today}:${taskId}`,{
      phone,taskId,vipLevel:String(vipLevel),reward:String(selectedVip.perTask),
      title:b.name || b.title,cover:b.image || b.cover || `/tasks/photo${taskId}.jpg`,status:'pending',
      date:today,createdAt:String(Date.now())
    });
    pipeline.sadd(`${P}tasks:${phone}:${today}`,taskId);
  });
  return {unlockedTasks};
}
async function seedVipTasks(){
  try{
    const today=getUgandaDateString();
    console.log(`🌍 Date: ${today} | Prefix: ${P}`);
    const userKeys=await redis.keys(`${P}user:*`);
    if(!userKeys.length){console.log('No pod users');return}
    
    let seeded=0;
    let skippedNoPhone=0;
    let skippedNoVip=0;
    let skippedNotBought=0;
    let skippedOther=0;

    console.log(`Found ${userKeys.length} user keys to check...`);

    for(const key of userKeys){
      const user=await redis.hgetall(key);
      if(!user?.phone){skippedNoPhone++; continue;}
      const phone=String(user.phone).trim();
      const hasBoughtVip=user.hasBoughtVip==='true'||user.hasBoughtVip===true;
      const currentVip=Number(user.vip||0);
      
      if(!hasBoughtVip){skippedNotBought++; console.log(`⏭️ SKIP ${phone} - not bought vip (hasBoughtVip=${user.hasBoughtVip})`); continue;}
      if(currentVip<=0){skippedNoVip++; console.log(`⏭️ SKIP ${phone} - vip ${currentVip} <=0`); continue;}
      if(!VIPS[currentVip]){skippedOther++; console.log(`⏭️ SKIP ${phone} - vip level ${currentVip} not in VIPS`); continue;}

      const pipeline=redis.pipeline();
      pipeline.del(`${P}tasks:${phone}:${today}`);
      const {unlockedTasks}=await assignTasksToUser(phone,currentVip,today,pipeline);
      pipeline.hset(key,{
        unlockedTasks:JSON.stringify(unlockedTasks),
        completedTasks:'[]',
        tasks_done_today:'0',
        dailyIncome:'0',
        lastResetDate:today,
      });
      await pipeline.exec();
      seeded++;
      console.log(`✅ SEEDED ${phone} VIP${currentVip} -> ${unlockedTasks.length} tasks`);
    }

    console.log(`\n====== SEED REPORT ======`);
    console.log(`✅ Seeded: ${seeded} users`);
    console.log(`⏭️ Skipped (no phone): ${skippedNoPhone}`);
    console.log(`⏭️ Skipped (not bought vip): ${skippedNotBought}`);
    console.log(`⏭️ Skipped (vip <=0): ${skippedNoVip}`);
    console.log(`⏭️ Skipped (other): ${skippedOther}`);
    console.log(`📊 Total checked: ${userKeys.length}`);
    console.log(`========================\n`);

  }catch(e){console.error(e)}
}
seedVipTasks();