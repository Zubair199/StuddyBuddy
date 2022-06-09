module.exports = {

    AUTHENTICATIONS: {
        API_URL: "http://192.168.8.102:5000"
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
        GET_TEACHER_SCHEDULE : '/api/class/teacher/scehdule',

        GET_TEACHER_SEARCH : '/api/class/teacher/search/',

    },
    EXAM: {
        CREATE: "/api/exam",                
        GET_ALL_ACTIVE_EXAMS_BY_TEACHER_ID: "/api/exam/teacher/active/",                
        GET_ALL_EXAMS_BY_TEACHER_ID : '/api/exam/teacher/',
        GET_EXAM_BY_EXAM_ID : '/api/exam/',
    }, 
    ASSIGNMENT: {
        CREATE: "/api/assignment",                
        GET_ALL_ACTIVE_ASSIGNMENTS_BY_TEACHER_ID: "/api/assignment/teacher/active/",                
        GET_ALL_ASSIGNMENTS_BY_TEACHER_ID : '/api/assignment/teacher/',
        GET_ASSIGNMENT_BY_ASSIGNMENT_ID : '/api/assignment/',
        
    },
};

