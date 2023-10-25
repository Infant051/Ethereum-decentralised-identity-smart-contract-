import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
 const [Id, setId] = useState("");
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [addr, setAddr] = useState("");
 const [mAddr, setmAddr] = useState("");
 const [data, setdata] = useState("");
   const [Wallet, setWallet] = useState("");



 const handleId = (e) => {
  setId(e.target.value)
 }

 const handleName = (e) => {
  setName(e.target.value)
 }

 const handleEmail = (e) => {
  setEmail(e.target.value)
 }
 
 const handleAddr = (e) => {
  setAddr(e.target.value)
 }
 
 const handleRegisterIdentity = async () => {
  try {
   let tx = await contract.registerIdentity(Id.toString(), name,  email, addr)

  let wait =  await tx.wait()
  alert(wait.transactionHash)
  console.log(wait);
  } catch (error) {
   alert(error)
  }
 }

 const handleMetamaskAddr = (e) => {
  setmAddr(e.target.value)
 }


 const handleAddrDetails = async () => {
  try {
   let tx = await contract.getIdentityDetails(mAddr)
   let arr = []
   tx.map(e => arr.push(e))
   setdata(arr)
   // alert(tx)
   console.log(tx);
  } catch (error) {
   alert(error)
  }
 }

   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Identity On Blockchain</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>
     <Col style={{marginRight:"100px"}}>
      <div>

      
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleId} type="number" placeholder="Enter Identity ID" value={Id} /> <br />
     
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleName} type="string" placeholder="Enter Name" value={name} /> <br />
     
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleEmail} type="string" placeholder="Enter Email" value={email} /><br />
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleAddr} type="string" placeholder="Enter Address" value={addr} /><br />
       
       <Button onClick={handleRegisterIdentity} style={{ marginTop: "10px" }} variant="primary">Register Identity</Button>
      </div>
     </Col>
     <Col>
      <div>
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleMetamaskAddr} type="string" placeholder="User Metamask address" value={mAddr} /><br />

       <Button onClick={handleAddrDetails} style={{ marginTop: "10px" }} variant="primary">Get Identity Details</Button>
       {data ? data?.map(e => {
          return <p>{e.toString()}</p>
       }) : <p></p>}
      </div>
     </Col>
    </Row>
    
   </Container>

  </div>
 )
}

export default Home;
