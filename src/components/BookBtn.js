import React from 'react'

const BookBtn = () => {
  const handleBookNowClick = () => {
    // Scroll to the book tour form element
    const bookTourFormElement = document.getElementById("bookTourForm");
    if (bookTourFormElement) {
      bookTourFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div class="fixed-bottom" style={{zIndex: "10", width: "100%", backgroundColor: "#fff", padding: "0"}}>
        <div class="book-now-container d-md-none" style={{display: "flex", width: "100%"}}>
          <div class="cartDiv" style={{width: "33.333%"}}>
            <button type="button" class="btn btn-primary addCart" data-bs-toggle="button" style={{width: "100%",
                 height:"9.4vh",
                  fontSize: "4.4vw",
                  fontWeight: "500",
                  borderRadius:"0",
                  backgroundColor:"#28a745"}}>
              Add to <span><i class="fas fa-cart-shopping"></i></span>
            </button>
          </div>
          <div class="bookDiv" style={{width: "66.6666%" }}>
            <button type="button" class="btn btn-primary active bookBtn"
              onClick={handleBookNowClick}
              data-bs-toggle="button" 
            style={{width: "100%",
            backgroundColor:"#fd7e14",
                 height: "9.4vh",
                fontSize: "4.4vw",
                 fontWeight: "550",
                 borderRadius: "0"}}
                aria-pressed="true">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookBtn
