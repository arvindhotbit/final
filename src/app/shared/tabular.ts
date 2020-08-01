
export interface pepscheme {
	REF_KEY : string,
	ROLE : String,
	USER_ID : String,
	USER_NAME : String,
	 USER_ZONE : String,
	VALUE : String,
	ZONE_ID : String,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String

};
	
export interface Neutralscheme {
	REF_KEY : string,
	ROLE : String,
	USER_ID : String,
	USER_NAME : String,
	 USER_ZONE : String,
	NOISE_WORD : String,
	ZONE_ID : String,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String

};


export interface addzonescheme {
	REF_KEY : string,
	ROLE : String,
	USER_ID : String,
	USER_NAME : String,
	 USER_ZONE : String,
	 COUNTRY_NAME : String,
	ZONE_ID : String,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String

};

export interface sensitivescheme {
	REF_KEY : string,
	ROLE : String,
	USER_ID : String,
	USER_NAME : String,
	USER_ZONE : String,
	SENSITIVE_WORDS : String,
	ZONE_ID : String,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String

};

export interface Bicscheme {
	REF_KEY : string,
	USER_ID : string,
	USER_NAME : string,
	USER_ZONE : string,
	ROLE : string,
	ZONE_ID : string,
	BIC : string,
	INSTITUTION_NAME : string,
	CITY : string,
	COUNTRY : string,
	BIC8 : string,
	WATCHLIST_NAME: string,
	WATCHLIST_TYPE: string,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String


};
export interface Interdefination {
	LIST_TYPE : string,
	LIST_CATEGORY : string,
	REF_KEY : string,
	USER_ID : string,
	USER_NAME : string,
	USER_ZONE : string,
	ROLE : string,
	ZONE_ID : string,
	WATCHLIST_NAME: string,
	WATCHLIST_ID: string,
	HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String
};


export interface sanctioned {
	REF_KEY : "",
	USER_ID : "",
	USER_NAME : "",
	USER_ZONE : "",
	ROLE : "",
	ZONE_ID : "",
	ENTRY_TYPE : "",
	SANCTIONED_CITY : "",
	HIST_ID : "",
	APPROVE_STATUS : "",
	CHANGE_TYPE : ""
};


export interface internalwatchlist {
	UID_SERIAL_NO: string,
	ZONE_ID : string,
	WATCHLIST_ID : string,
	WATCHLIST_NAME : string,
	CUSTOMER_NAME_ENGLISH : string,
	CUSTOMER_NAME_ARABIC :string,
	CUSTOMER_TYPE:string,
	CITY :string,
	CUSTOMER_ACCOUNT : string,
	DOB : string,
	RESIDENCE_COUNTRY : string,
	RESIDENCE_COUNTRY_FLAG: string,
	NATIONALITY : string,
	ID_NUMBER: string,
	ID_TYPE :string,
	KNOWN_AS_NAME_ENGLISH : string,
	KNOWN_AS_NAME_ARABIC : string,
	MOTHER_NAME : string,
	ADDRESS: string,
	REMARKS: string,
	CIN :string,
	NEW_PAN :string,
	SOURCE: string,
	CUSTOMER_STATUS : string,
	BRANCH : string,
	CUSTOMER_RISK_LEVEL : string,
	CUSTOMER_CREATE_DATE: string,
	CUST_RISK_LEVEL_UPDATE_DATE : string,
	POLITICALLY_EXPOSED: string,
	DETAILS_PROGRAMS: string,
	OTHERS_REMARKS : string,
	OTHERS_DATA_SOURCES : string,
	OTHERS_RELATED_TO : string,
	};



	export interface Highriskcountry {
		REF_KEY :string,
		USER_ID : string,
		USER_NAME : string,
		USER_ZONE : string,
		ROLE : string,
		ZONE_ID : string,
		COUNTRY_CODE : string,
		COUNTRY_NAME : string,
		RISK_LEVEL : string,
		SANCTIONED_FLAG :string,
		INITIAL_LOAD_FLAG : string,
		WATCHLIST_NAME : string,
		WATCHLIST_TYPE : string,
		HIST_ID : string,
		APPROVE_STATUS : string,
		CHANGE_TYPE : string
	};

	export interface Zonevsglobal {
		ZONE_ID: string,
		PROGRAM_KEYWORD: string,
		PROGRAM_KEYWORD_DESC:string,
		REF_KEY: string,
		PAYSYS_ID:string,
		SCOPE:string,
		ROLE : String,
		USER_ID : String,
		USER_NAME : String,
		 USER_ZONE : String,
		 HIST_ID : String,
	APPROVE_STATUS : String,
	CHANGE_TYPE : String
		}

		export interface Paymentscreenadk {
			REF_KEY: string,
			ZONE_ID: string,
			MTXXX_TYPE : string,
			FIELD_LABEL : string,
			SCAN : string,
			TAG_A : string,
			TAG : string,
			ROLE : String,
			USER_ID : String,
			USER_NAME : String,
			USER_ZONE : String,
			HIST_ID : String,
			APPROVE_STATUS : String,
			CHANGE_TYPE : String
			}


			export interface matchscore {
				REF_KEY: string,
				ZONE_ID: string,
				PAYSYS_ID : string,
				MATCHSCORE_THRESHOLD : string,
				ROLE : String,
				USER_ID : String,
				USER_NAME : String,
				USER_ZONE : String,
				HIST_ID : String,
				APPROVE_STATUS : String,
				CHANGE_TYPE : String
				}
				export interface namescreen {
					REF_KEY: string,
					ZONE_ID: string,
					FIELD_LABEL : string,
					SCAN : string,
					ROLE : String,
					USER_ID : String,
					USER_NAME : String,
					USER_ZONE : String,
					HIST_ID : String,
					APPROVE_STATUS : String,
					CHANGE_TYPE : String
					}


					export interface casedetail
					{
					 ROLE : string,
					 ECM_CASE_ID : string,
					 MESSAGE_ID : string,
                     CREATION_DTTM:Date
					} 
					export interface departscheme {
						REF_KEY : string,
						ROLE : String,
						USER_ID : String,
						USER_NAME : String,
						 USER_ZONE : String,
						 DEPARTMENT_ID :String,
						 DESCRIPTIONS : String,
						ZONE_ID : String,
						HIST_ID : String,
						APPROVE_STATUS : String,
						CHANGE_TYPE : String
					
					}
					export interface paysysscheme {
						REF_KEY : string,
						ROLE : String,
						USER_ID : String,
						USER_NAME : String,
						 USER_ZONE : String,
						 PAYSYS_ID : String,
						 CASE_TYPE_NS :String,
						 CASE_TYPE_PS : String,
						ZONE_ID : String,
						HIST_ID : String,
						APPROVE_STATUS : String,
						CHANGE_TYPE : String
					
					};


	