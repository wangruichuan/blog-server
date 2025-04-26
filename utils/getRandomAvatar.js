const avatars = [
    'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg',
    'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg',
    'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg',
    'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg',
  ]

function getRandomAvatar() {
    const index = Math.floor(Math.random() * avatars.length);
    return avatars[index];
}
module.exports = getRandomAvatar;