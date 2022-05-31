module.exports = {

    AUTHENTICATIONS: {
        API_URL: "http://192.168.10.6:5000"
    },
    AUTH: {
        SIGNUP: "/api/auth/signup",
        SIGNIN: "/api/auth/signin",
        EMAIL_RESET_PASSWORD: "/api/auth/resetPassword"
    },
    CLASS: {
        CREATE: "/api/class",                
        GET_ALL_ACTIVE_CLASSES_BY_TEACHER_ID: "/api/class/teacher/active/",        
        GET_ALL_CLASSES_BY_TEACHER_ID : '/api/class/teacher/',
        GET_CLASS_BY_CLASS_ID : '/api/class/',

    },
    EXAM: {
        CREATE: "/api/exam",                
        GET_ALL_ACTIVE_EXAMS_BY_TEACHER_ID: "/api/exam/teacher/active/",                
        GET_ALL_EXAMS_BY_TEACHER_ID : '/api/exam/teacher/',
    }, 
    ASSIGNMENT: {
        CREATE: "/api/assignment",                
        GET_ALL_ACTIVE_ASSIGNMENTS_BY_TEACHER_ID: "/api/assignment/teacher/active/",                
        GET_ALL_ASSIGNMENTS_BY_TEACHER_ID : '/api/assignment/teacher/',
        
    },
};

