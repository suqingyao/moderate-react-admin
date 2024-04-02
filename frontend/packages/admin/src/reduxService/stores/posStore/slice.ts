/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import { Pos, PosCarrier, PosItem, StoreState } from "./model";
import names from "src/reduxService/stores/names";

const initialState = (): StoreState => {
  return {
    posList: [], // pos列表，
    posItemList: [],
    id: "", // 编辑页面查看的当前pos的id
    currentData: null, // 当前pos的数据
    posTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    posItemTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    loading: false,
    posCarrierList: [],
    locationList: {}, // 添加posItem的posInfo属性枚举值
  };
};

const slice = createSliceCustom({
  name: names.posStore,
  stateInit: initialState,
  reducers: {
    // 设置当前的data
    setCurrentData(state, { payload }: PayloadAction<Pos>) {
      state.currentData = payload;
    },
    // 添加postItem
    addPostItem(state, data: PayloadAction<PosItem>) {
      state.posItemList = [...state.posItemList, data.payload];
    },
    setPostItemList(state, data: PayloadAction<PosItem[]>) {
      state.posItemList = data.payload;
    },
    setPostList(state, data: PayloadAction<Pos[]>) {
      state.posList = data.payload;
    },
    setPosCarrier(state, data: PayloadAction<PosCarrier[]>) {
      state.posCarrierList = data.payload;
    },
    setLocaionList(state, data: PayloadAction<any>) {
      state.locationList = data.payload;
    },
  },
});

export default slice;
