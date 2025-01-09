import { configureStore, createSlice } from "@reduxjs/toolkit";
const vendorDetailsId = '122';
// Initial State
const initialState = {
  activeTab: sessionStorage.getItem("activeTabId") || "VendorDetails",
  vendorType: sessionStorage.getItem("vendorType") || "DSA",
  vendorId: sessionStorage.getItem("vendorDetails")
    ? JSON.parse(sessionStorage.getItem("vendorDetails")).VendorId
    : vendorDetailsId,
  isUserCentralized: false, //changed
  vendorName: sessionStorage.getItem("vendorDetails")
    ? JSON.parse(sessionStorage.getItem("vendorDetails")).VendorName
    : "",
  rating: {
    ratingData: [],
    ratingSaveData: [],
    averageVendorRatingModel: {
      Id: "",
      VendorId: vendorDetailsId,
      TotalScore: 0,
      EligibleScore: 0,
      Conclusion: "",
      Deviations: "",
      FileStream: "",
      FileName: "",
      MaxVendorRatingScore: 0,
    },
    financialForm: {
      FinancialList: [],
      vendorRatingFinancialInfoReadModel: {},
      conditions: {
        FinancialFormOnTypes: "",
        FinancialFormOnNatureOfServices: [],
        FinancialFormBillingMaxLimit: 0,
      },
    },
    eligibleScore: [],
    eligibleScoreStatus: {
      level: "",
      color: "",
      score: 0,
    },
  },
  categorization: {
    data: [],
    gtScore: 0,
    loading: false,
    scoreRating: "",
    notificationData: {
      ReviewerRemarks: "",
      LastReviewSentOn: "",
      Reviewers: [],
    },
  },
  details: {
    FormData: [],
    URN: "",
    IsActive: true,
    InactivationDate: "",
    ReasonOfInactivation: "",
    InactivationEvidence: "",
  },
  additionalDetails: {
    FilledFormJson: [],
  },
  review: {
    StageJson: [],
  },
  editAccess: {
    hasEditAccess: false,//changed
    isInViewMode: JSON.parse(localStorage.getItem("isViewMode") || "true"),
  },
  vendorDetails: {
    details: JSON.parse(sessionStorage.getItem("vendorDetails")),
  },
};

// Redux Slice
const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    changeTab(state, action) {
      state.activeTab = action.payload;
    },
    saveVendorId(state, action) {
      state.vendorId = action.payload;
    },
    changeVendorDetails(state, action) {
      const { vendorType, vendorDepartment } = action.payload;
      state.vendorType = vendorType;
      state.vendorDepartment = vendorDepartment;
    },
    updateRatingData(state, action) {
      state.rating.ratingData = action.payload;
    },
    updateCategorizationData(state, action) {
      state.categorization.data = action.payload;
    },
    changeVendorDetailsForm(state, action) {
      const { FormData, IsActive, URN, Type } = action.payload;
      state.details.FormData = FormData;
      state.details.Type = Type;
      if (IsActive !== undefined) state.details.IsActive = IsActive;
      if (URN !== undefined) state.details.URN = URN;
    },
    setReview(state, action) {
      state.review.StageJson = action.payload.StageJson;
    },
    updateEditAccess(state, action) {
      const { isInViewMode } = action.payload;
      localStorage.setItem("isViewMode", JSON.stringify(isInViewMode));
      state.editAccess.isInViewMode = isInViewMode;
    },
  },
});

// Export actions
export const {
  changeTab,
  saveVendorId,
  changeVendorDetails,
  updateRatingData,
  updateCategorizationData,
  changeVendorDetailsForm,
  setReview,
  updateEditAccess,
} = vendorSlice.actions;

// Configure Redux Store
const store = configureStore({
  reducer: {
    vendor: vendorSlice.reducer,
  },
});

export default store;
