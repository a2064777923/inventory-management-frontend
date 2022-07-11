//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';


const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';
//author:Hong ZiXian
//Date:2022/05/30
const WAREHOUSE_EXPORT_TO_EXCEL = '/api/warehouse/warehouse/export';


// 销售管理
// 进货管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';
// 进货退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';
// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
// 销售退货管理
const SALE_RETURN_ALL = '/api/sale-returns/sheet-show';
const SALE_RETURN_CREATE = '/api/sale-returns/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/sale-returns/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/sale-returns/second-approval';
// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_PURCHASE_ALL = '/api/purchase/sheet-show';
const SALE_PURCHASE_CREATE = '/api/purchase/sheet-make';
const SALE_CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_CUSTOMER_MAX = '/api/sale/maxAmountCustomer';
// 销售策略制定
const MAKE_DISCOUNT = '/api/discount/discount-make'
const DELETE_DISCOUNT = '/api/discount/discount-delete'
const SHOW_DISCOUNT = '/api/discount/discount-show'

//author:Hong ZiXian
//Date:2022/06/29
//财务人员API
//帳戶管理
const BANK_ALL = '/api/bank/getAllBank';
const BANK_CREATE = '/api/bank/bank-make'
const BANK_EDIT = '/api/bank/bank-edit'
const BANK_DELETE = '/api/bank/bank-delete'
//收付款单
const COLLECTION_CREATE = '/api/payment/collection-sheet-make';
const PAYMENT_CREATE = '/api/payment/payment-sheet-make';
const COLLECTION_ALL = '/api/payment/collection-get-all';
const PAYMENT_ALL ='/api/payment/payment-get-all';
const TRANSFERMENT_APPROVAL = '/api/payment/transfer-sheet-approval';
//工资单
const SALARY_SHEET_ALL = 'api/salary/salary-sheet-all';
const SALARY_SHEET_CREATE = 'api/salary/salary-sheet-make';
const SALARY_SHEET_APPROVAL = 'api/salary/salary-sheet-approval';
//全部员工信息
const STAFF_INFO_ALL = 'api/salary/staff-info-all';
//查找表单
const SALESMEN_ALL = 'api/search-sheet/get-all-salesmen';
const SALES_DETAILS_SEARCH ='api/search-sheet/get-sales-details';
const SEARCH_PURCHASE = 'api/search-sheet/get-purchase-sheet';
const SEARCH_PURCHASE_RETURN = 'api/search-sheet/get-purchase-return-sheet';
const SEARCH_SALES = 'api/search-sheet/get-sales-sheet';
const SEARCH_SALES_RETURN = 'api/search-sheet/get-sales-return-sheet';
const SEARCH_TRANSFER = 'api/search-sheet/get-transfer-sheet';
const INCOME_ALL = 'api/search-sheet/get-all-income';
const EXPEND_ALL = 'api/search-sheet/get-all-expend';

const WORKER_GET_ALL = 'api/humanresource/getallworkers'


module.exports = {
  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DEATIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,
  WAREHOUSE_EXPORT_TO_EXCEL,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_FIND_SHEET_BY_ID,

  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_CUSTOMER_QUERY,
  SALE_CUSTOMER_MAX,
  SALE_FIND_SHEET_BY_ID,
  CUSTOMER_QUERY,

  
  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  
  MAKE_DISCOUNT,
  DELETE_DISCOUNT,
  SHOW_DISCOUNT,
  
  //author:Hong ZiXian
  //Date:2022/06/28
  //财务人员API
  BANK_ALL,
  BANK_CREATE,
  BANK_EDIT,
  BANK_DELETE,
  COLLECTION_CREATE,
  PAYMENT_CREATE,
  TRANSFERMENT_APPROVAL,
  COLLECTION_ALL,
  PAYMENT_ALL,
  SALARY_SHEET_ALL,
  SALARY_SHEET_CREATE,
  SALARY_SHEET_APPROVAL,
  STAFF_INFO_ALL,
  SALESMEN_ALL,
  SALES_DETAILS_SEARCH,
  SEARCH_PURCHASE,
  SEARCH_PURCHASE_RETURN,
  SEARCH_SALES,
  SEARCH_SALES_RETURN,
  WORKER_GET_ALL,
  INCOME_ALL,
  EXPEND_ALL
  
};
