module.exports = {

    AUTHENTICATIONS: {
        API_URL: "http://192.168.43.122:5000"
    },
    AUTH: {
        SIGNUP: "/api/auth/signup",
        SIGNIN: "/api/auth/signin",
        EMAIL_RESET_PASSWORD: "/api/auth/resetPassword"
    },
    CLASS: {
        CREATE: "/api/class",
        GET_ALL_ACTIVE_CLASSES_BY_TEACHER_ID: "/api/class/teacher/active/",
        
        GET_ALL_ACTIVE_UPCOMING_CLASSES_BY_TEACHER_ID: "/api/class/teacher/upcoming/active/",

        GET_ALL_CLASSES_BY_TEACHER_ID: '/api/class/teacher/',
        GET_CLASS_BY_CLASS_ID: '/api/class/',
        GET_TEACHER_SCHEDULE: '/api/class/teacher/scehdule',

        GET_TEACHER_SEARCH: '/api/class/teacher/search/',

        GET_ALL_ACTIVE_CLASSES: '/api/classes/active',

        JOIN_CLASS: '/api/joinClass',
        
        GET_TEACHER_UPCOMING_CLASSES: '/api/teacher/getAllTodaysActiveClasses/',
        GET_STUDENT_UPCOMING_CLASSES: '/api/student/getAllTodaysActiveJoinedClasses/',
        
        GET_JOINED_CLASS_BY_ID: '/api/student/getJoinedClassByID/',

        GET_JOINED_CLASS_ASSIGNMENTS_BY_STUDENT_ID : '/api/student/getAllActiveJoinedClassesAssignments/',
        GET_JOINED_CLASS_EXAMS_BY_STUDENT_ID : '/api/student/getAllActiveJoinedClassesExams/',

        GET_JOINED_CLASS_ASSIGNMENT_BY_STUDENT_ASSINGMENT_ID : '/api/student/getJoinedClassAssignmentById/',
        GET_JOINED_CLASS_EXAM_BY_STUDENT_EXAM_ID : '/api/student/getJoinedClassExamById/',

        // GET_JOINED_CLASS_EXAMS_BY_STUDENT_ID : '/api/student/getAllActiveJoinedClassesExams/',

        START_ASSIGNMENT : '/api/student/startAssignment/',
        START_EXAM : '/api/student/startExam/',
        GET_STUDENT_SCHEDULE: '/api/class/student/scehdule',

        GET_STUDENT_SEARCH: '/api/class/student/search/',
        
    },
    EXAM: {
        CREATE: "/api/exam",
        GET_ALL_ACTIVE_EXAMS_BY_TEACHER_ID: "/api/exam/teacher/active/",
        GET_ALL_EXAMS_BY_TEACHER_ID: '/api/exam/teacher/',
        GET_EXAM_BY_EXAM_ID: '/api/exam/',
        GET_EXAM_QUESTIONS_BY_EXAM_ID : '/api/exam/question/',
        GET_ALL_COMPLETED_EXAMS: '/api/exams/completed/',


    },
    ASSIGNMENT: {
        CREATE: "/api/assignment",

        GET_ALL_ACTIVE_ASSIGNMENTS_BY_TEACHER_ID: "/api/assignment/teacher/active/",

        GET_ALL_ASSIGNMENTS_BY_TEACHER_ID: '/api/assignment/teacher/',

        GET_ASSIGNMENT_BY_ASSIGNMENT_ID: '/api/assignment/',

        GET_ASSIGNMENT_QUESTIONS_BY_ASSIGNEMNT_ID : '/api/assignment/question/',

        GET_ALL_ACTIVE_ASSIGNMENTS: '/api/assignment/active',

        GET_ALL_COMPLETED_STUDENT_ASSIGNMENTS: '/api/student/assignments/completed/',
        GET_ALL_COMPLETED_TEACHER_ASSIGNMENTS: '/api/teacher/assignments/completed/',



    },
};

