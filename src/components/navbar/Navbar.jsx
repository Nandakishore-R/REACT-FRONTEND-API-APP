import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <>
    <div className="sidebar" data-active-color="blue" data-background-color="black" style={{ width : '85px'}}>
    
    <div className="logo">
        <a href="/" className="simple-text logo-mini">
            <p className="new-p">Risk<br />Central</p>
        </a>
    </div>
    <div className="sidebar-wrapper">
        <div className="new-design-theme navleft">
            <ul className="leftside-nav">
                

                <li className="dummy">
                
                    <a>
                        <svg>
                            <use xlinkHref="#home" />
                        </svg>
                        <p>
                            Home
                        </p>
                    </a>
                </li>
                <li className="dummy">
                        <a>
                            <svg>
                                <use xlinkHref="#dashboard" />
                            </svg>
                            <p>Dashboards</p>
                        </a>
                    </li>


                    <li className="dummy">
                        <a>
                            <svg>
                                <use xlinkHref="#action-center" />
                            </svg>
                            <p>Action Center</p>
                        </a>
                    </li>
                    <li>
                       <a>
                           <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25">
                               <defs>
                                   <clipPath id="clip-TemplateHub">
                                       <rect width="25" height="25" />
                                   </clipPath>
                               </defs>
                               <g id="TemplateHub" clipPath="url(#clip-TemplateHub)">
                                   <path id="DOCUMENTS" d="M235.147,1127.9H222.092a1.031,1.031,0,0,1-1.031-1.031v-17.865a1.031,1.031,0,0,1,1.031-1.031h5.5v5.841a2.064,2.064,0,0,0,2.061,2.066h6.528v10.989A1.031,1.031,0,0,1,235.147,1127.9Zm-5.5-13.052a1.032,1.032,0,0,1-1.031-1.033v-5.854l7.558,6.886H229.65Zm-6.813,14.083h11.279a1.031,1.031,0,0,1-1.031,1.031H221.061A2.061,2.061,0,0,1,219,1127.9v-16.834a1.031,1.031,0,0,1,1.031-1.031v16.834a2.061,2.061,0,0,0,2.061,2.061Z" transform="translate(-215 -1106.027)" fill="#fff" fillRule="evenodd" />
                               </g>
                           </svg>

                           <p>Templates hub</p>
                       </a>
                   </li>
                    <li className="dummy">
                      
                            <a>
                                 
                                <svg>
                                    <use xlinkHref="#applications" />
                                </svg>
                                <p>Applications</p>
                            </a>
                        </li>
            </ul>
        </div>
    </div>
    </div>
    <svg display="none">
    <symbol viewBox="0 0 25 25" id="settings">
        <path id="COG" d="M231.944,2241.806a8.658,8.658,0,0,1-.832,1.985c.052.065,1.914,2.406.77,3.55l-.57.571c-.857.857-3-.486-3.517-.828a8.711,8.711,0,0,1-2.1.842l.151,0s-.407,3.062-2.048,3.062h-.563c-1.251,0-1.948-2.623-2.068-3.118a8.683,8.683,0,0,1-2.075-.887l.113.12s-2.424,1.906-3.585.746l-.513-.426c-.882-.882.539-3.218.824-3.664a8.69,8.69,0,0,1-.81-1.938c-.482-.117-3.124-.814-3.124-2.069v-.563c0-1.449,2.519-1.936,3.109-2.029a8.673,8.673,0,0,1,.805-1.954c-.27-.411-1.749-2.757-.859-3.647l.542-.456c1.021-1.021,3.113.425,3.6.788a8.7,8.7,0,0,1,1.985-.833c.155-.615.848-3.068,2.056-3.068h.563c1.407,0,1.905,2.372,2.019,3.051a8.668,8.668,0,0,1,2.013.83c.53-.346,2.714-1.681,3.569-.826l.513.542c1,1-.387,3.025-.79,3.567a8.685,8.685,0,0,1,.83,1.989c.179.026,3.045.456,3.045,2.046v.563C234.993,2240.953,232.584,2241.644,231.944,2241.806Zm-8.448-8.779a6.469,6.469,0,1,0,6.469,6.469A6.469,6.469,0,0,0,223.5,2233.027Zm0,10.782a4.313,4.313,0,1,1,4.313-4.312A4.313,4.313,0,0,1,223.5,2243.809Zm0-6.469a2.156,2.156,0,1,0,2.156,2.156A2.157,2.157,0,0,0,223.5,2237.34Z" transform="translate(-210.992 -2226.992)" fillRule="evenodd" />
    </symbol>

    <symbol viewBox="0 0 25 25" id="home">
        <path id="HOME" d="M461,1905.5a1.169,1.169,0,0,1-1.969.855l0,0-10.5-10.5h0l-.03-.029h0l-10.5,10.5h0a1.171,1.171,0,1,1-1.634-1.679l11.3-11.3a1.168,1.168,0,0,1,.845-.36h.072l.053,0h0a1.17,1.17,0,0,1,.729.366h0l4.611,4.611v-1.077a1.172,1.172,0,0,1,2.344,0v3.421l4.373,4.373,0,0A1.164,1.164,0,0,1,461,1905.5Zm-2.344,1.953v8.2a1.172,1.172,0,0,1-1.172,1.172h-2.344v-9.375h-4.687v9.375H439.516a1.172,1.172,0,0,1-1.172-1.172v-8.2L448.5,1897.3Zm-12.109,0h-4.687v4.688h4.688Z" transform="translate(-436 -1891.754)" fillRule="evenodd" />
    </symbol>

    <symbol viewBox="0 0 25 25" id="dashboard">
        <path id="GRID_2" data-name="GRID 2" d="M233.966,2027h-6.9a1.034,1.034,0,0,1-1.034-1.034v-6.9a1.034,1.034,0,0,1,1.034-1.034h6.9a1.034,1.034,0,0,1,1.034,1.034v6.9A1.034,1.034,0,0,1,233.966,2027Zm0-11.034h-6.9a1.034,1.034,0,0,1-1.034-1.035v-6.9a1.034,1.034,0,0,1,1.034-1.034h6.9a1.034,1.034,0,0,1,1.034,1.034v6.9A1.034,1.034,0,0,1,233.966,2015.965ZM222.931,2027h-6.9a1.034,1.034,0,0,1-1.034-1.034v-6.9a1.034,1.034,0,0,1,1.034-1.034h6.9a1.034,1.034,0,0,1,1.034,1.034v6.9A1.034,1.034,0,0,1,222.931,2027Zm0-11.034h-6.9a1.034,1.034,0,0,1-1.034-1.035v-6.9a1.034,1.034,0,0,1,1.034-1.034h6.9a1.034,1.034,0,0,1,1.034,1.034v6.9A1.034,1.034,0,0,1,222.931,2015.965Z" transform="translate(-212 -2003.748)" fillRule="evenodd" />
    </symbol>

    <symbol viewBox="0 0 25 25" id="action-center">
        <path id="TIME" d="M2083.5,435a11.5,11.5,0,1,1,11.5-11.5A11.5,11.5,0,0,1,2083.5,435Zm0-20.844a9.344,9.344,0,1,0,9.344,9.344A9.344,9.344,0,0,0,2083.5,414.156Zm4.672,10.422H2083.5a1.078,1.078,0,0,1-1.078-1.078v-6.469a1.078,1.078,0,0,1,2.156,0v5.391h3.594a1.078,1.078,0,0,1,0,2.156Z" transform="translate(-2071 -410.75)" fillRule="evenodd" />
    </symbol>

    @* <symbol viewBox="0 0 25 25" id="template-hub">
            <path id="DOCUMENTS" d="M235.147,1127.9H222.092a1.031,1.031,0,0,1-1.031-1.031v-17.865a1.031,1.031,0,0,1,1.031-1.031h5.5v5.841a2.064,2.064,0,0,0,2.061,2.066h6.528v10.989A1.031,1.031,0,0,1,235.147,1127.9Zm-5.5-13.052a1.032,1.032,0,0,1-1.031-1.033v-5.854l7.558,6.886H229.65Zm-6.813,14.083h11.279a1.031,1.031,0,0,1-1.031,1.031H221.061A2.061,2.061,0,0,1,219,1127.9v-16.834a1.031,1.031,0,0,1,1.031-1.031v16.834a2.061,2.061,0,0,0,2.061,2.061Z" transform="translate(-215 -1106.027)" fillRule="evenodd" />
        </symbol>*@

    <symbol viewBox="0 0 24 24" id="verified-user">
        <path id="VERIFIED_USER" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fillRule="evenodd" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="applications">
        <path id="APPLICATIONS" d="M459.167,2355.471h0l-10.8,4.469-.005,0,0,0h0a1.112,1.112,0,0,1-.855,0h0l0,0,0,0-10.8-4.469h0a1.118,1.118,0,1,1,.855-2.066h0l.005,0,0,0,10.373,4.292,10.373-4.292.005,0,0,0h0a1.118,1.118,0,1,1,.855,2.066Zm0-4.846h0l-10.8,4.469-.005,0,0,0h0a1.109,1.109,0,0,1-.855,0h0l0,0,0,0-10.8-4.469h0a1.117,1.117,0,0,1,0-2.066h0l10.8-4.469,0,0,0,0h0a1.112,1.112,0,0,1,.855,0h0l0,0,.005,0,10.8,4.469h0a1.118,1.118,0,0,1,0,2.066Zm-22.048,7.541a1.114,1.114,0,0,1,.428.085h0l.005,0,0,0,10.373,4.292,10.373-4.292.005,0,0,0h0a1.118,1.118,0,1,1,.855,2.066h0l-10.8,4.469-.005,0,0,0h0a1.112,1.112,0,0,1-.855,0h0l0,0,0,0-10.8-4.469h0a1.118,1.118,0,0,1,.427-2.151Z" transform="translate(-435 -2341)" fillRule="evenodd" />
    </symbol>
    </svg>
    </>
    
  )
}

export default Navbar