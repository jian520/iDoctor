
let API_ADDRESS = 'http://www.part-times.com'


export default {

	HOST: 			API_ADDRESS, 
	LOGIN:    		API_ADDRESS + '/mobile/login',
	REGISTER:     	API_ADDRESS + '/mobile/register',
    CLINIC_LIST:    API_ADDRESS + '/mobile/clinics?language=',




    DOCTOR_AVATAR:  API_ADDRESS + '/uploads/doctor/',

    DEPT_LIST:      API_ADDRESS + '/mobile/categories?language=', //科室 列表
    DOCTOR_LIST:    API_ADDRESS + '/mobile/doctors', // 所有医生
    AREA_LIST:      API_ADDRESS + '/mobile/districts', // 所有地区
    DEPT_DOCTOR:    API_ADDRESS + '/mobile/doctors?category=', //科室找医生
    AREA_DOCTOR:    API_ADDRESS + '/mobile/doctors?district=', //地区 找医生

};
