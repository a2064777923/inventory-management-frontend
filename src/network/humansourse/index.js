import request from "@/network/request";
const testAPI = require("@/apis");


export const getAllWorkers = config=>request._get(testAPI.WORKER_GET_ALL, config)