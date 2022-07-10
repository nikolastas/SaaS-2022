import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {

  // if(sessionStorage.getItem('auth') != 'true')
  //     return <Navigate to = "/login"/>

  return (
    <div className='center'>
      <p style={{textAlign:'center' , fontSize:'17px'}}>Ο σκοπός του λογισμικού είναι η διαχείριση ενός συστήματος διαλειτουργικότητας τον διοδίων. Με τα δεδομένα, που του παρέχουν οι λειτουργοί των διοδίων, το λογισμικό θα εξασφαλίζει τον δίκαιο διαμοιρασμό των χρημάτων που αφορούν τις διελεύσεις των κατόχων e-pass μεταξύ των λειτουργών. </p>
    </div>
  )
}

export default Home