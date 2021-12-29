const rules = {
    Pragaut: {
        static: [
            "admin-page:visit",
            "admin-page:list",
            "admin-page:create",
            "admin-page:edit",
            "admin-page:delete",
            "company-master:list",
            "company-master:create",
            "company-master:edit",
            "company-master:delete",
            "dashboard-page:visit",
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:visit",
        ]
    },
    Admin: {
        static: [
            "admin-page:visit",
            "admin-page:list",
            "admin-page:create",
            "admin-page:edit",
            "admin-page:delete",
            "company-master:list",
            "company-master:create",
            "company-master:edit",
            "company-master:delete",
            "dashboard-page:visit"
        ]
    },
    AISUAdmin: {
        static: [
            "admin-page:visit",
            "admin-page:list",
            "admin-page:create",
            "admin-page:edit",
            "admin-page:delete",
            "dashboard-page:visit"
        ]
    },
    
    SubAdmin: {
        static: [
            "admin-page:list",
            "admin-page:create",
            "admin-page:edit",
            "admin-page:delete",
            "admin-page:visit",
            "home-page:visit",
            "dashboard-page:visit"
        ]
    },
    Management: {
        static: [
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:delete",
            "user-page:visit",
            "home-page:visit",
            "dashboard-page:visit"
        ]
    },
    PraGautAdmin: {
        static: [
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:delete",
            "user-page:visit",
            "home-page:visit",
            "dashboard-page:visit"
        ]
    }
};

export default rules;