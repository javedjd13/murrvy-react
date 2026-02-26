
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal: false,
    data: '',
    offset: false,
    overlay: false,
    firstModal: false,
    addToCartModal: false,
    addedCartData: '',
    sizeModal: false,
    categoryResponsive: false,
    profileModal: false,
    paymentCardsModal: false,
    saveAddressModal: false,
    notificationAlert: false,
    notificationData: [],
    youTubeModal: false,
    isDashboard: false,
    isDelete: false,
    confirmDelete: false,
    TopMenuToggle: false,
    configToggle: false,
    ProductFilter: false
};

const ModalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    IS_MODAL: (state, action) => {
      const payload = action.payload;

      if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "isOpen")) {
        state.modal = Boolean(payload.isOpen);

        if (Object.prototype.hasOwnProperty.call(payload, "data")) {
          state.data = payload.data || "";
        } else if (!state.modal) {
          state.data = "";
        }

        return;
      }

      state.modal = !state.modal;

      if (payload !== undefined) {
        state.data = payload || "";
      } else if (!state.modal) {
        state.data = "";
      }
    },
    IS_OFFSET: (state) => {
      state.offset = !state.offset;
    },
    OVERLAY: (state) => {
      state.overlay = !state.overlay;
    },
    CLOSEOVERLAY: (state) => {
      state.overlay = false;
    },
    RESETOVERLAY: (state) => {
      state.categoryResponsive = false;
      state.TopMenuToggle = false;
      state.isDashboard = false;
      state.ProductFilter = false;
    },
    TOPMENUTOGGLE: (state) => {
      state.TopMenuToggle = !state.TopMenuToggle;
    },
    STARTMODAL: (state) => {
      state.firstModal = !state.firstModal;
    },
    ISCARTADD: (state, action) => {
      const payload = action.payload;

      if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "isOpen")) {
        state.addToCartModal = Boolean(payload.isOpen);

        if (Object.prototype.hasOwnProperty.call(payload, "data")) {
          state.addedCartData = payload.data || "";
        }

        return;
      }

      state.addToCartModal = !state.addToCartModal;
      if (payload !== undefined) {
        state.addedCartData = payload || "";
      }
    },
    SIZEMODAL: (state) => {
      state.sizeModal = !state.sizeModal;
    },
    CATEGORYRESPONSIVE: (state) => {
      state.categoryResponsive = !state.categoryResponsive;
    },
    ISPROFILEMODAL: (state) => {
      state.profileModal = !state.profileModal;
    },
    PAYMENTCARDMODAL: (state) => {
      state.paymentCardsModal = !state.paymentCardsModal;
    },
    SAVEADDRESSMODAL: (state) => {
      state.saveAddressModal = !state.saveAddressModal;
    },
    NOTIFICATIONALTER: (state, action) => {
      state.notificationAlert = action.payload?.alert || false;
      state.notificationData = action.payload?.data || [];
    },
    YOUTUBEMODAL: (state) => {
      state.youTubeModal = !state.youTubeModal;
    },
    ISDASHBOARD: (state) => {
      state.isDashboard = !state.isDashboard;
    },
    OPENDELETEMODAL: (state) => {
      state.isDelete = !state.isDelete;
    },
    CONFIRMDELETE: (state) => {
      state.confirmDelete = !state.confirmDelete;
    },
    CONFIGMODAL: (state) => {
      state.configToggle = !state.configToggle;
    },
    PRODUCTPAGEFILTER: (state) => {
      state.ProductFilter = !state.ProductFilter;
    },
  },
});

export const { IS_MODAL, IS_OFFSET, OVERLAY, CLOSEOVERLAY, RESETOVERLAY, TOPMENUTOGGLE, STARTMODAL, ISCARTADD, SIZEMODAL, CATEGORYRESPONSIVE, ISPROFILEMODAL, PAYMENTCARDMODAL, SAVEADDRESSMODAL, NOTIFICATIONALTER, YOUTUBEMODAL, ISDASHBOARD, OPENDELETEMODAL, CONFIRMDELETE, CONFIGMODAL, PRODUCTPAGEFILTER } = ModalReducer.actions;

export default ModalReducer.reducer;
