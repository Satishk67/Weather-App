import './Body.css'

function Body(){
    return(
        <>
        <h1 className='heading'>Quick Search</h1>
        <ul className="flexbox">
            <ul className="gridbox">
                <li><button className='states-btn' id=''>Bihar </button></li>
                <li><button className='states-btn' id=''>West Bengal </button></li>
                <li><button className='states-btn' id=''>Jharkhand </button></li>
                <li><button className='states-btn' id=''>Uttar Pradesh </button></li>
                <li><button className='states-btn' id=''>New Delhi </button></li>
                <li><button className='states-btn' id=''>Tamil Nadu </button></li>
                <li><button className='states-btn' id=''>Gujarat </button></li>
                <li><button className='states-btn' id=''>Goa </button></li>
                <li><button className='states-btn' id=''>Jammu & Kashmir </button></li>
            </ul>
            <ul className="gridbox">
                <li><button className='states-btn' id=''>Maharashtra </button></li>
                <li><button className='states-btn' id=''>Arunachal Pradesh </button></li>
                <li><button className='states-btn' id=''>Andhra Pradesh </button></li>
                <li><button className='states-btn' id=''>Sikkim </button></li>
                <li><button className='states-btn' id=''>Karnataka </button></li>
                <li><button className='states-btn' id=''>Meghalaya </button></li>
                <li><button className='states-btn' id=''>Mizoram </button></li>
                <li><button className='states-btn' id=''>Orissa </button></li>
                <li><button className='states-btn' id=''>Manipur </button></li>
            </ul>
        </ul>
        </>
    )
}
export default Body;