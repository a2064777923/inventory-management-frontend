//author:Hong ZiXian
//Date:2022/06/29

import request from "@/network/request"
const testAPI = require("@/apis")


export const getAllBank = config => request._get(testAPI.BANK_ALL, config)
export const createBankAccount = config => request._post(testAPI.BANK_CREATE, config)
export const updateBank = config => request._post(testAPI.BANK_EDIT,config)
export const deleteBankAccount = config => request._get(testAPI.BANK_DELETE,config)

export const createCollectionSheet = config => request._post(testAPI.COLLECTION_CREATE, config)
export const createPaymentSheet = config => request._post(testAPI.PAYMENT_CREATE, config)
export const getAllCollection = config => request._get(testAPI.COLLECTION_ALL,config)
export const getAllPayment = config => request._get(testAPI.PAYMENT_ALL,config)
export const transferApproval = config =>request._get(testAPI.TRANSFERMENT_APPROVAL,config)