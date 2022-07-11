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
export const getAllSalarySheet = config =>request._get(testAPI.SALARY_SHEET_ALL,config)
export const createSalarySheet = config =>request._post(testAPI.SALARY_SHEET_CREATE,config)
export const salarySheetApproval = config =>request._get(testAPI.SALARY_SHEET_APPROVAL,config)
export const getAllStaffInfo = config =>request._get(testAPI.STAFF_INFO_ALL,config)
export const getAllSalesmens = config =>request._get(testAPI.SALESMEN_ALL,config)
export const getAllSalesDetails = config=>request._post(testAPI.SALES_DETAILS_SEARCH,config)
export const getPurchaseSheet = config =>request._post(testAPI.SEARCH_PURCHASE,config)
export const getPurchaseReturnSheet = config =>request._post(testAPI.SEARCH_PURCHASE_RETURN,config)
export const getSaleSheet = config =>request._post(testAPI.SEARCH_SALES,config)
export const getSalesReturnSheet = config =>request._post(testAPI.SEARCH_SALES_RETURN,config)
export const getAllIncomes = config => request._get(testAPI.INCOME_ALL,config)
export const getAllExpend = config => request._get(testAPI.EXPEND_ALL,config)