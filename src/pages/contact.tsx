const ContactPage = () => {
  return <>
   {/* Breadcrumb Start */}
   <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Trang chủ
              </a>
              <span className="breadcrumb-item active">Liên hệ</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Contact Start */}
      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Liên hệ chúng tôi</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form bg-light p-30">
              <div id="success" />
              <form
                action="https://formspree.io/f/mkndnapk"
                method="POST"
                name="sentMessage"
              >

                <div className="control-group">
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    data-validation-required-message="Please enter your name"
                  />
                  <p className="help-block text-danger" />
                </div>
                
                <div className="control-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    data-validation-required-message="Please enter your email"
                  />
                  <p className="help-block text-danger" />
                </div>

                
                <div className="control-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    id="message"
                    name="message"
                    placeholder="Message"
                    required
                    data-validation-required-message="Please enter your message"
                    defaultValue={""}
                  />
                  <p className="help-block text-danger" />
                </div>



                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                >
                  Send Message
                </button>
              </form>

                </>
  
};

export default ContactPage;
