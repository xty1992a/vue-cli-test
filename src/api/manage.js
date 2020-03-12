/**
 * Created by TY-xie on 2018/4/2.
 */
import request from "./request";

export const login = params =>
  request(
    {
      url: "/Business/Login",
      data: {
        params
      }
    },
    false
  );

export const getAllItemNew = () =>
  request(
    {
      url: "/AsyncApi/GetAllItemsNew",
      data: {}
    },
    false
  );
export const getMultiItemNew = () =>
  request(
    {
      url: "/AsyncApi/MutiItemsNew",
      data: {}
    },
    false
  );

export const uploadFile = (size, data, isCompress = true) =>
  request(
    {
      url: `/UploadFile/UploadTempFile?fileMaxSize=${size}&fileTypes=mp3&isCompress=${isCompress}`,
      data,
      header: { "Content-Type": "multipart/form-data" }
    },
    true
  );

export const editMoreCard = data =>
  request(
    {
      url: "/Manage/Item/EditMoreAndCardItem",
      data
    },
    true
  );

// 编辑滑屛广告
/*/Manage/Advertise/AddHomeAdVue
 {
 Guid,  唯一标示
 Title, 标题
 ImagePath, 图片
 Url,	连接
 Index  //序号
 }
 */
export const addHomeAdVue = data =>
  request(
    {
      url: "/Manage/Market/AddHomeAdVue",
      data
    },
    true
  );
export const editHomeAdVue = data =>
  request(
    {
      url: "/Manage/Market/EditHomeAdVue",
      data
    },
    true
  );
export const deleteHomeAdVue = guid =>
  request(
    {
      url: "/Manage/Market/DeleteHomeAdVue",
      data: {
        params: {
          guid
        }
      }
    },
    true
  );
export const getAdvertiseHomeList = () =>
  request(
    {
      url: "/Manage/Market/GetAdvertiseHomeList",
      data: {}
    },
    true
  );

export const getSecondList = (secondKillGuids) => request({
  url: '/Trade/SecondKill/GetSecondKillList',
  data:  {secondKillGuids}
})

//获取列表
export const getItemList = params =>
  request({
    url: "/Manage/Item/GetItemList",
    data: {
      params
    }
  });

export const deleteItemVue = guid =>
  request(
    {
      url: "/Manage/Item/DeleteItemVue",
      data: {
        params: {
          guid
        }
      }
    },
    true
  );
export const setParameterVue = guid =>
  request(
    {
      url: "/Manage/Item/SetParameterVue",
      data: {
        params: {
          guid
        }
      }
    },
    true
  );
export const setParameter = data =>
  request(
    {
      url: "/Manage/Item/SetParameter",
      data
    },
    true
  );

export const editMemberInfoMenu = guids =>
  request(
    {
      url: "/Manage/Item/EditMemberInfoMenu",
      data: {
        menuItems: guids
      }
    },
    false
  );

// 获取商品信息
export const getGoodsItemOnlineList = guids =>
  request(
    {
      url: "/Manage/Item/GetGoodsItemOnlineList",
      data: {
        goodsItemOnlineGuids: guids
      }
    },
    true
  );
export const getGroupSpliceList = guids =>
  request(
    {
      url: "/Manage/Item/GetGroupSpliceList",
      data: {
        groupSpliceGuids: guids
      }
    },
    true
  );
export const getCoupon = guids =>
  request(
    {
      url: "/Manage/Item/GetCouponList",
      data: {
        couponGuids: guids
      }
    },
    true
  );

export const getGoodsByGuid = guids =>
  request(
    {
      url: "/Shop/GetGoodsItemOnlineList",
      data: {
        goodsItemOnlineGuids: guids
      }
    },
    false
  );

// 分页接口
export const getGoodsList = data =>
  request({
    url: "/Manage/Item/GetGoodsItemOnlinePaged",
    data
  });
export const getGroupList = data =>
  request({
    url: "/Manage/Item/GetGroupSplicePaged",
    data
  });
export const getCouponList = data =>
  request({
    url: "/Manage/Item/GetCouponPaged",
    data
  });

export const editWxPage = data =>
  request(
    {
      url: "/Manage/Item/EditWxPage",
      data
    },
    true
  );

//market
//mutiRecommend
export const saveRecommendSetting = params =>
  request({
    url: "/Market/MutiRecommend/SaveRecommendSetting",
    data: {
      params: params
    }
  });

//trade
//uPay
export const getQrcodeList = data =>
  request({
    url: "/Trade/UPay/QrcodeList",
    data
  });
export const customizedQrcode = data =>
  request({
    url: "/Trade/UPay/CustomizedQrcode",
    data
  });
export const getStoreList = params =>
  request({
    url: "/Trade/UPay/GetStoreList",
    data: {
      params: params
    },
    method: "Get"
  });
export const getStaffAccountList = guid =>
  request({
    url: "/Trade/UPay/GetStaffAccountList",
    data: {
      params: {
        storeGuid: guid
      }
    },
    method: "Get"
  });
export const deleteQrcode = guid =>
  request({
    url: "/Trade/UPay/DeleteQrcode",
    data: {
      params: {
        guid: guid
      }
    }
  });
export const getQrcode = ({ guid, type }) =>
  request({
    url: "/Trade/UPay/GetQrcode",
    data: {
      // params: {
      //   guid: guid
      // },
      type: type,
      guid: guid
    }
  });

//promotion

export const getGlobalParameter = () =>
  request({
    url: "/Member/Promotion/GetGlobalParameter",
    method: "get",
    data: {}
  });

export const getRegisterFields = () =>
  request({
    url: "/Member/Promotion/GetRegisterFields",
    method: "get",
    data: {}
  });

export const saveGlobalParameter = data =>
  request({
    url: "/Member/Promotion/SaveGlobalParameter",
    data
  });

export const saveRegisterFileds = data =>
  request({
    url: "/Member/Promotion/saveRegisterFileds",
    data
  });

export const editApplyRule = data =>
  request({
    url: "/Member/Promotion/EditApplyRule",
    data
  });

export const getBatchNumberList = () =>
  request({
    url: "/Member/Promotion/GetBatchNumberList",
    data: {}
  });

export const deleteApplyRule = guid =>
  request({
    url: "/Member/Promotion/DeleteApplyRule",
    data: {
      params: {
        guid: guid
      }
    }
  });

export const getPromotionStoreList = (pageIndex, pageSize, searchStr) =>
  request({
    url: "/Member/Promotion/GetStoreList",
    data: {
      params: {
        pageIndex,
        pageSize,
        searchStr
      }
    }
  });

export const getApplyRuleList = (pageIndex, pageSize, searchStr) =>
  request({
    url: "/Member/Promotion/GetApplyRuleList",
    data: {
      params: {
        pageIndex,
        pageSize,
        searchStr
      }
    },
    method: "get"
  });

export const getMemberGroupList = (
  pageIndex,
  pageSize,
  searchStr,
  storeGuid = ""
) =>
  request({
    url: "/Member/Promotion/GetMemberGroupList",
    data: {
      params: {
        pageIndex,
        pageSize,
        searchStr,
        chainStoreGuid: storeGuid
      }
    }
  });

export const getStaffList = storeGuid =>
  request({
    url: "/Member/Promotion/GetStaffList",
    data: {
      params: {
        chainStoreGuid: storeGuid
      }
    }
  });

export const checkMember = cardId =>
  request({
    url: "/Member/Promotion/CheckMember",
    data: {
      params: {
        cardId
      }
    }
  });

export const getWxCardList = (pageIndex, pageSize, searchStr) =>
  request({
    url: "/Member/Promotion/GetWxCardList",
    data: {
      params: {
        pageIndex,
        pageSize,
        searchStr
      }
    },
    method: "get"
  });

export const deleteWxCard = guid =>
  request({
    url: "/Member/Promotion/DeleteWxCard",
    data: {
      params: {
        guid
      }
    }
  });

export const setPayIsMember = guid =>
  request({
    url: "/Manage/Wechat/SetPayIsMember",
    data: {
      params: {
        guid
      }
    }
  });

export const updateApplyRuleStatus = (guid, status) =>
  request({
    url: "/Member/Promotion/UpdateApplyRuleStatus",
    data: {
      params: {
        guid,
        status
      }
    }
  });

export const checkApplyRuleTitle = title =>
  request({
    url: "/Member/Promotion/CheckApplyRuleTitle",
    data: {
      params: {
        title
      }
    }
  });

export const getStoreParameterList = (pageIndex, pageSize, searchStr = "") =>
  request({
    url: "/Member/Promotion/GetStoreParameterList",
    data: {
      params: {
        pageIndex,
        pageSize,
        searchStr
      }
    }
  });

export const setPayMember = (wxCardId, wechatMchId, open) =>
  request({
    url: "/Member/Promotion/SetPayMember",
    data: {
      wxCardId,
      wechatMchId,
      open
    }
  });

export const getAllMerchantPaymemberInfo = () =>
  request({
    url: "/Member/Promotion/GetAllMerchantPaymemberInfo",
    data: {},
    method: "get"
  });

export const updateStoreParameter = (storeGuid, memberGroupGuid = "") =>
  request(
    {
      url: "/Member/Promotion/UpdateStoreParameter",
      data: {
        params: {
          storeGuid,
          memberGroupGuid
        }
      }
    },
    true
  );

export const getQrcodeUrl = (sceneId, orgguid, type) =>
  request({
    url: "/Member/ApplyRule/GetQrcodeUrl",
    data: {
      params: {
        sceneId,
        orgguid,
        type
      }
    }
  });

//electronicinvoice
export const getAllMap = () =>
  request({
    url: "/Manage/WeChat/GetAllMap",
    data: {}
  });

export const getBankBrach = params =>
  request({
    url: "/Manage/WeChat/GetBankBrach",
    data: { params: params }
  });

export const saveInvoice = data =>
  request({
    url: "/Manage/WeChat/SaveInvoice",
    data: data
  });

export const editActivity = data =>
  request({
    url: "/Trade/UPay/SaveActivity",
    data: data
  });
