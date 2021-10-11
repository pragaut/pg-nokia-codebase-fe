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
    CFO: {
        static: [
            "admin-page:visit",
            "user-page:list",
            "home-page:visit"
        ]
    },
    FC: {
        static: ["user-page:list"]
    },
    Corporate_Coordinator: {
        static: [
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:visit"
        ]},
    PlantHRHead: {
        static: [
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:visit"
        ],
        dynamic: {
            "user-page:delete": ({ userId, invoiceOwnerId }) => {
                if (!userId || !invoiceOwnerId) return false;
                return userId === invoiceOwnerId;
            }
        }
    },
    companyHRHead: {
        static: [
            "user-page:list",
            "user-page:create",
            "user-page:edit",
            "user-page:visit"
        ]
    }
};

export default rules;