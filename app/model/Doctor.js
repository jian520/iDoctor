import API from '../constants/API'
export default function Doctor(avatar,name){
    this.avatar=  avatar ? API.DOCTOR_AVATAR + avatar : 'doctor_no_image_g';
    this.name=name;
}