import { useState } from "react";
import { createStore } from "reusable";

// tslint:disable-next-line: react-hooks-nesting
export const useNode = createStore(() => useState([{
  nodeId: "",
  nodeName: "",
  nodeNetwork: "",
  version: "",
  clientVersionResult: "",
  blockNumber: "",

}]));
