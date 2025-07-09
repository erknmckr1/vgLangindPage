"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "src/lib/redux/slices/userInfoSlice";
import { setBillingInfo } from "src/lib/redux/slices/billingInfoSlice";
import { setTheme } from "src/lib/redux/slices/themeSlice";
import { setStoreProfile } from "src/lib/redux/slices/storeProfileSlice";
import { UserInfoI } from "src/lib/redux/slices/userInfoSlice";
import { ThemeI } from "src/lib/redux/slices/themeSlice";
import { StoreProfileI } from "src/lib/redux/slices/storeProfileSlice";
import { BillingInfoI } from "src/lib/redux/slices/billingInfoSlice";
interface UserInfoProviderProps {
  children: React.ReactNode;
  settingInfo: {
    userInfo: UserInfoI;
    billingInfo: BillingInfoI[];
    storeProfile: StoreProfileI;
    themeInfo: ThemeI;
  };
}

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
  settingInfo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserInfo(settingInfo.userInfo));
    dispatch(setBillingInfo(settingInfo.billingInfo));
    dispatch(setStoreProfile(settingInfo.storeProfile));
    dispatch(setTheme(settingInfo.themeInfo));
  }, [dispatch, settingInfo]);

  return <> {children} </>;
};
