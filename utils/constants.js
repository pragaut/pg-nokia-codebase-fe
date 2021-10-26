const session_key_version = 'v3';

export const constants = {
    USE_ENCRYPTION: true,
    ENCRYPTION_SALT: 'A37u172sSFS9O9JNHs82u38djdncnvyz9',
    DEFAULT_ROWS_LIST: 30,
    ALL_ROWS_LIST: 9999999,
    TOP_TEN_ROWS_LIST: 10,
    APP_NAME: 'staking',

    NO_IMAGE: 'no-image.jpeg',

    END_POINTS: {
        LOGIN: 'account/login',
        FORGOT_PASSWORD: 'account/forgotPassword',
        VERIFY_PASSWORD_OTP: 'otp/password-verification/verify-otp',
        RESET_PASSWORD: 'account/resetPassword',
        RESEND_OTP: 'account/resend-otp',
        CHANGE_PASSWORD: 'user/changePassword',
        REGISTER_ACCOUNT: 'account/register',
        REGISTER_lOGIN: 'account/register-login',
        UPDATE_PROFILE: 'account/update-profile',
        REGISTER_FREETRIAL: 'account/register-free-trial',
        USER_SAVE: 'user',
        IMAGES: 'images/',
        ADDRESS: 'address',
        VERIFY_OTP: 'otp/verification/verify-otp',
        VERIFY_EMAIL_OTP: 'otp/email-verification/verify-otp',
        VERIFY_MOBILE_OTP: 'otp/email-verification/verify-otp',
        VERIFY_EMAIL_OTP_AND_LOGIN: 'otp/email-verification/verify-otp-and-login',
        VERIFY_MOBILE_PWD: 'otp/password-verification/verify-mobil-pwd',
        REWARD_CLAIM: 'user/userewards',
        REWARD_ADD: 'user/addrewards',

        RECONCILIATION: {
            IMAGE_CHANGE: 'audit/imageUpload',
        },

        AUDIT: {
            IMAGE_CHANGE: 'audit/imageUpload',
        },
        NOKIA: {
            IMAGE_CHANGE: 'nokia/imageUpload',
        },
        SHOPPING: {
            PRODUCTS: 'shopping/product',
            IMPORT_PRODUCTS: 'shopping/product/importProducts',
            PRODUCTS_BRIEF: 'product/brief',
            REVIEW: 'review',
            COUPON: 'shopping/coupon',
            ORDER: 'shopping/order',
            CART: 'cart',
            IMAGE_CHANGE: 'shopping/imageUpload',
        },
        COACHING: {
            IMAGE_CHANGE: 'audit/imageUpload',
        },
        EMAIL: 'send'
    },

    SHOPPING: {
        LINE_ITEM_STATUS: {
            DELIVERED: 'delivered',
            RETURNED: 'returned',
            PACKED: 'packed',
            SHIPPED: 'shipped',
            PENDING: 'pending',
            CANCEL: 'cancel',
            REFUND: 'refund'
        },

        COUPON: {
            ASSOCIATION_TYPES: {
                PRODUCT: 'product',
                USER: 'user',
                CATEGORY: 'category',
                OFFERCODE: 'code',
            }
        }
    },

    SESSION_KEYS: {
        LOGGED_USER: 'tb_' + session_key_version + '_y12iuh2184',
        LOGGED_USER_EMAIL: 'tb_' + session_key_version + '_kdjdu18',
        TOKEN: 'tb_' + session_key_version + '_ajhshg15g',
        REFRESH_TOKEN: 'tb_' + session_key_version + '_jjsu2737u1',
        USER_ID: 'tb_' + session_key_version + '_827uhhhavD',
        PLANT_ID: 'tb_' + session_key_version + '_827uhhhplntavD',
        COMPANY_ID: 'tb_' + session_key_version + '_827uhhcmphavD',
        USER_FULLNAME: 'tb_' + session_key_version + '_827mjreavD',
        USER_NAME: 'tb_' + session_key_version + '_827mnbhavD',
        USER_NAME_TYPE: 'tb_' + session_key_version + '_82YFSbhavD',
        AUTH_TYPE: 'tb_' + session_key_version + '_82YvfsyikavD',
        PASSWORD_TOKEN: 'tb_' + session_key_version + '_1152hshdyf24',
        CART_ITEMS: 'tb_' + session_key_version + '_mmjjhhg5454132',
        REFERRAL_CODE: 'tb_' + session_key_version + '_11j1h1h2j4jh',
        BOGO_CLAIMED: 'tb_' + session_key_version + '_bc',
        BOGO_TO_BE_CLAIMED_BY: 'tb_' + session_key_version + '_bc',
        BOGO_PATCH_COUPON_KEY: 'tb_' + session_key_version + '_bpck',
        BOGO_PATH_OFFER_NAME: 'tb_' + session_key_version + '_bpon',
        TEMP_USER: 'tb_' + session_key_version + '_llopo9097',
        CART_ID: 'tb_' + session_key_version + '_mmsjdh162gd',
        DEVICE_ID: 'tb_v2_nnkksjsuw12',
        NEWS_LETTER_SUBSCRIBED: 'tb_' + session_key_version + '_avsg63dkalsk',
        CURRENT_CHAPTER_ID: 'tb_' + session_key_version + '_0921882JJSJDJ17',
        CURRENT_COACHHANDSREVIEW_ID: 'tb_' + session_key_version + '_0921882asdfg',
        CURRENT_PLAYNEXPLAIN_ID: 'tb_' + session_key_version + '_0921882asderg',
        REGISTRED_EMAIL: 'tb_' + session_key_version + '_pg_pguefsdf',
        REGISTRED_PWD: 'tb_' + session_key_version + '_pg_tpguefnnf',
        socialauth: 'tb_' + session_key_version + '_pg_socialauthqwert',
        ONBORDING_SCREENS_STATUS: 'tb_' + session_key_version + '_pg_.,mnbvfrtyqwert',
        LOGIN_COUNT: 'tb_' + session_key_version + '_oiuytrsxcmjh',
        GROUP_ID: 'tb_' + session_key_version + '_oiuytrscftghjikmxcmjh',
        USER_LOGGEDROLE: 'tb_' + session_key_version + 'pg_oiuytrsctxwekmxcmjh',
        SELECTED_SELFAUDIT_PLANID: 'tb_' + session_key_version + 'pg_osdwefqicdsfw',
        SELECTED_SELFAUDIT_MULTISECTION: 'tb_' + session_key_version + 'pg_osdgsdasdasdcdsfw',
        SELECTED_PROCESSFLOW: 'tb_' + session_key_version + 'pb_osdgsdaspbqdqdd33wsd423dasdcdsfw',
        SELECTED_AUDITPLANDETAILSID:'PG_' + session_key_version + 'pb_osdgsdaspbsa3edfgy7id423dasdcdsfw',
        CURRENT_YEAR_YEARTYPE_ISCENTRALPLANCOMPANY: 'tb_' + session_key_version + 'pg_oiuytrscxvxvxcdwetweekmxcmjh',
    },

    COACHING: {
        SUBSCRIPTION: {
            STATUS: {
                active: 'ballorca',
                inactive: 'nancilia'
            }
        }
    },

    COURIER_NAME: {
        FIRST_COMPANY: 'Bluedart',
        SECOND_COMPANY: 'Delhivery',
        THIRD_COMPANY: 'Fedex',
    }
};