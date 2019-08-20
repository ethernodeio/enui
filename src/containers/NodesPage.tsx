import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useUsername } from "../stores/useCredsStore";
import { useNode } from "../stores/useNodesStore";
import { useToken } from "../stores/useTokenStore";
import { EnAPIhttp } from "../api/EnApi";
import { NavigationBar } from "../components/navigationComponent";
import NodeList from "../components/nodeComponents";
import NodeModal from "./NodeModal";

interface IProps {
  history: any;
}

const NodesPage: React.FC<IProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
    }),
  );

  const [username] = useUsername();
  const [nodes, setNodes] = useNode();
  const [token] = useToken();
  const [mounted, setMounted] = useState(true);
  const [result, setResult] = useState();
  const classes = useStyles();

  const getNodes = () => {
    EnAPIhttp.getUser(token, username).then((userInfoResult) => {
      setNodes(userInfoResult.nodes);
      if (userInfoResult.nodes.length === 0) { setMounted(false); }
      nodes.map((node: any, index: any) => {
        EnAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "net_version", [], 67).then((versionResult) => {
          // tslint:disable-next-line: no-string-literal
          node.version = versionResult.result;
          setNodes(nodes);
        });
        EnAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_syncing", [], 67).then((syncResult) => {
          if (syncResult.result !== false) {
            // tslint:disable-next-line: no-string-literal
            node.sync = syncResult.result;
            setNodes(nodes);
          } else {
            node.sync = "false";
            setNodes(nodes);
          }
          setMounted(false);
        });
        EnAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "web3_clientVersion", [], 67).then((clientVersionResult) => {
          // tslint:disable-next-line: no-string-literal
          node.clientversion = clientVersionResult.result;
          setNodes(nodes);
        });
        return nodes;
      });
    });
  };

  useEffect(() => {
    getNodes();
    if (nodes.length === 0) { return; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted && nodes]);

  function testNode() {
    console.log("hello from modal");
  }

  async function addNode(nodeName: string, nodeNetwork: string, syncType: string, enableRpc: boolean, enableWS: boolean) {
    const addNodeResult = await EnAPIhttp.addNode(token, username, nodeName, nodeNetwork, syncType, enableRpc, enableWS);
    console.log(addNodeResult);
    if (addNodeResult && addNodeResult.status === "success") {
      const getUserInfo = await EnAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);
      setMounted(false);
      props.history.go(0);
    } else {
      console.log(addNodeResult.message);
      setResult(addNodeResult.message);
    }
  }

  async function removeNodes(containerId: string, nodeName: string, removeData: boolean) {
    const removeNodeResult = await EnAPIhttp.removeNode(token, username, containerId, nodeName, removeData);
    if (removeNodeResult && removeNodeResult.status === "success") {
      const getUserInfo = await EnAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);
      setMounted(false);
      props.history.push("/nodes");
    } else {
      console.log(removeNodeResult.message);
      setResult(removeNodeResult.message);
    }
  }

  return (
    <div className={classes.root} >
      <NavigationBar title={"Nodes - Hello " + username + " these are your running nodes: "} />
      {nodes ? <NodeList removeNodes={removeNodes} /> : < div > Loading Nodes</div>}
      <NodeModal addNode={addNode} getNodes={getNodes} testNode={testNode} />
      {result && <div>{result}</div>}
    </div>
  );
};
export default NodesPage;
