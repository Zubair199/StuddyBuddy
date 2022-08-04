module.exports = {

    AUTHENTICATIONS: {
        // Saims
        // API_URL: "http://192.168.43.122:5000",
        // CHAT_SERVER_URL: 'http://192.168.43.122:5000',

        // Zubairs
        API_URL: "http://192.168.1.3:5000",
        CHAT_SERVER_URL: 'http://192.168.1.3:5000',
    },

    NOTIFICATION: {
        GETNOTIFICATION: "/notifications?limit=50",
        READNOTIFICATION: "/notifications/read/"
    },
    CHAT: {
        NEWCHAT: "/api/createnew",
        MESSAGES: "/api/getchats",
        GROUP: "/api/getgroupchats",
        UNREADCOUNTS: "/api/getunreadcounts",
        OPENCHAT: "/api/openchat",
        BLOCK: "/api/blockChat",
        VERIFYBLOCKED: "/api/verifyChatblocked"


    },
    GENERAL: {

        SITE_CONTENTS: "/api/sitecontents",
        USER_SEARCH: "/api/user/search/",
        TEACHER_SEARCH: "/api/teacher/search/",
        CLASS_SEARCH: "/api/class/search/"

    },
    AUTH: {

        SIGNUP: "/api/auth/signup",
        SIGNIN: "/api/auth/signin",

        VERIFY: "/api/auth/verify",
        EMAIL_RESET_PASSWORD: "/api/auth/resetPassword",
        USERS: "/api/getUsers",
        SELF: "/api/getself",

        PROFILE: "/api/auth/profile",
        GET_PROFILE: "/api/auth/profile/",
        EDIT_PROFILE: "/api/auth/updateprofile/",

        GET_USER_BY_EMAIL: "/api/auth/getUserByEmail/",
        GET_USER_BY_ID: "/api/auth/getUser/",
        EDIT_USER: "/api/auth/updateuser/",

    },
    CLASS: {
        CREATE: "/api/class",
        CREATE_TOPIC: "/api/class/topic",
        CREATE_ANNOUNCEMENT: "/api/class/announcement",
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

        GET_JOINED_CLASS_ASSIGNMENTS_BY_STUDENT_ID: '/api/student/getAllActiveJoinedClassesAssignments/',
        GET_JOINED_CLASS_EXAMS_BY_STUDENT_ID: '/api/student/getAllActiveJoinedClassesExams/',

        GET_JOINED_CLASS_ASSIGNMENT_BY_STUDENT_ASSINGMENT_ID: '/api/student/getJoinedClassAssignmentById/',
        GET_JOINED_CLASS_EXAM_BY_STUDENT_EXAM_ID: '/api/student/getJoinedClassExamById/',

        // GET_JOINED_CLASS_EXAMS_BY_STUDENT_ID : '/api/student/getAllActiveJoinedClassesExams/',

        START_ASSIGNMENT: '/api/student/startAssignment/',
        START_EXAM: '/api/student/startExam/',
        GET_STUDENT_SCHEDULE: '/api/class/student/scehdule',

        GET_STUDENT_SEARCH: '/api/class/student/search/',

        SUBJECTS: "/api/subjects",
        GET_TOPIC_ANNOUNCEMENT_BY_SCHEDULE_ID: "/api/class/topics/announcements/",

        JOINED_STUDENTS: "/api/class/students/",


        SEARCH: "/api/class/search/"
    },
    EXAM: {
        CREATE: "/api/exam",
        CREATE_QUESTIONS: "/api/exam/question",
        GET_ALL_ACTIVE_EXAMS_BY_TEACHER_ID: "/api/exam/active/teacher/",
        GET_ALL_EXAMS_BY_TEACHER_ID: '/api/exam/teacher/',
        GET_EXAM_BY_EXAM_ID: '/api/exam/',
        GET_EXAM_QUESTIONS_BY_EXAM_ID: '/api/exam/question/',
        GET_ALL_COMPLETED_EXAMS: '/api/exams/completed/',


    },
    ASSIGNMENT: {
        CREATE: "/api/assignment",
        CREATE_QUESTIONS: "/api/assignment/question",

        GET_ALL_ACTIVE_ASSIGNMENTS_BY_TEACHER_ID: "/api/assignment/active/teacher/",

        GET_ALL_ASSIGNMENTS_BY_TEACHER_ID: '/api/assignment/teacher/',

        GET_ASSIGNMENT_BY_ASSIGNMENT_ID: '/api/assignment/',
        GET_ASSIGNMENT_QUESTIONS_BY_ASSIGNEMNT_ID: '/api/assignment/question/',
        GET_ALL_ACTIVE_ASSIGNMENTS: '/api/assignment/active',

        GET_ALL_COMPLETED_STUDENT_ASSIGNMENTS: '/api/student/assignments/completed/',
        GET_ALL_COMPLETED_TEACHER_ASSIGNMENTS: '/api/teacher/assignments/completed/',



    },

    STRIPE: {
        CREATE_CARD: "/api/card",
        CARD_DETAILS: "/api/card/",
        UPDATE_CARD: "/api/card/",

        CREATE_PAYMENT: "/api/payment",
        GET_PAYMENT_INTENT: "/api/paymentIntent",

        PK_TEST: "pk_test_51LPq5PHMIjurc2gOdoR79YKnciMMUVfCBBXP0LYaZxIoNW1dFRhGreSkRu34TUMeZ7pZ9mTQrLAkPvPzYPr8gKKa00GuhqeZH9",
        SK_TEST: "sk_test_51LPq5PHMIjurc2gOXufycmqFoQc1Rk0B14OkDwNE3l3013yAdL1WUk1idTNBAi5nVF4bOZGtflpzTp0PdkXCURKU00azCFptoj",
    }
};

