import React, { Component } from 'react';
import imgBrandLogo from '../imgIcons/egatePassLogo.png'
export class Home extends Component {
 

  render() {
    return (
      <div className="container-fluid"> 
          
          <div className="row">
            
            <div className="col-sm-6 p-5">

                <h3 className="text-light">Whom it Helps?</h3> 
                <p className="lead text-light">

                Are you a person who owns a business / building / Shop  from small scale to 
                large scale where customers are regularly visiting
</p>
<p className="lead text-light">               Are you the person who wants to keep regular track of your visit to nearby shops ?
</p>
<p className="lead text-light">           
                Are you an Employer who wants to track the employees visit register on your Company?

                </p>
                <h3 className="text-light">Why E GATEPASS?</h3> 
                <p className="lead text-light">
If you are any of the person above we provide a solution to your problem.
A super efficient and light weight mechanism to track the visitors.
One click signup and you are Done.

</p>

<h3 className="text-light">How it Works?</h3> 
<p className="lead text-light">

You may enter any Shops/ Building / other premises where E GATEPASS is enabled.
Simply Scan the QR Code provided in the entry of the premise and your Entry pass will be issued.
Once you are  done one simple QR Scan to Exit the premise.

</p>


                 
                 </div>

                 <div className="col-sm-3">
                 
                 <img src={imgBrandLogo} alt="Brand Logo | Welcome to E Gate Pass" className="img-fluid"/>
                   </div>
       

              </div> 
               

      </div>
    );
  }
}
