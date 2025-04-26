const mongoose = require('mongoose');
const db = mongoose.connection;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await db.collection('counters').findOneAndUpdate(
    { _id: sequenceName }, // 查询条件
    { $inc: { sequence_value: 1 } }, // 更新操作
    { returnDocument: 'after', upsert: true } // 返回更新后的文档，如果不存在则插入新文档
  );
  return sequenceDocument.sequence_value; // 返回更新后的序列值
}



module.exports = getNextSequenceValue;