import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useUsername } from "../stores/useCredsStore";
import { useNode } from "../stores/useNodesStore";
import { useToken } from "../stores/useTokenStore";
import { enAPIhttp } from "../api/EnApi";
import { NavigationBar } from "../components/navigationComponent";
import NodeList from "../components/nodeComponents";
import NodeModal from "./NodeModal";
import useInterval from "use-interval";

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
  const [open, setOpen] = React.useState();

  const getNodes = () => {
    enAPIhttp.getUser(token, username).then((userInfoResult) => {
      setNodes(userInfoResult.nodes);
      if (userInfoResult.nodes.length === 0) { setMounted(false); }
      nodes.map((node: any, index: any) => {
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "net_version", [], 60).then((versionResult) => {
          node.version = versionResult.result;
          setNodes(nodes);
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_syncing", [], 61).then((syncResult) => {
          if (syncResult.result !== false) {
            node.sync = syncResult.result;
            setNodes(nodes);
          } else {
            node.sync = "false";
            enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_blockNumber", [], 62).then((blockNumberResult) => {
              node.blockNumber = blockNumberResult.result;
              setNodes(nodes);
              enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_getBlockByNumber", [blockNumberResult.result, true], 63).then((getBlockByNumResult) => {
                node.blockinfo = getBlockByNumResult.result;
                console.log(getBlockByNumResult.result);
                setNodes(nodes);
              });
            });
          }
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_chainId", [], 67).then((chainIdResult) => {
          node.chainid = chainIdResult.result;
          setNodes(nodes);
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "web3_clientVersion", [], 67).then((clientVersionResult) => {
          node.clientversion = clientVersionResult.result;
          setNodes(nodes);
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "net_peerCount", [], 67).then((netPeerCountResult) => {
          node.peers = netPeerCountResult.result;
          setNodes(nodes);
        });
        enAPIhttp.getNodeContainerInfo(token, node.nodeId).then((conatinerInfoResult) => {
          node.rpcPort = conatinerInfoResult[0].rpcPort;
          node.wsPort = conatinerInfoResult[0].wsPort;
        });
        setMounted(false);
      });
    });
  };

  async function addNode(nodeName: string, nodeNetwork: string, syncType: string, enableRpc: boolean, enableWS: boolean) {
    const addNodeResult = await enAPIhttp.addNode(token, username, nodeName, nodeNetwork, syncType, enableRpc, enableWS);
    if (addNodeResult && addNodeResult.status === "success") {
      const getUserInfo = await enAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);
      props.history.go(0);
    } else {
      setResult(addNodeResult.message);
    }
  }

  async function removeNodes(containerId: string, nodeName: string, removeData: boolean) {
    const removeNodeResult = await enAPIhttp.removeNode(token, username, containerId, nodeName, removeData);
    if (removeNodeResult && removeNodeResult.status === "success") {
      const getUserInfo = await enAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);
      setMounted(false);

    } else {
      setResult(removeNodeResult.message);
    }
  }

  useEffect(() => {
    getNodes();
    if (nodes.length === 0) { return; }
  }, [mounted && nodes]);

  useInterval(() => {
    getNodes();
  }, 7000);

  return (
    <div className={classes.root} >
      <NavigationBar title={"Nodes - Hello " + username + " these are your running nodes: "} />
      {nodes ? <NodeList removeNodes={removeNodes} /> : < div > Loading Nodes</div>}
      <NodeModal addNode={addNode} getNodes={getNodes} />
      {result && <div>{result}</div>}
    </div>
  );
};
export default NodesPage;
