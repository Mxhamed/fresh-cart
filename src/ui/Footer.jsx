import Facebook from "../icons/socials/Facebook";
import Instagram from "../icons/socials/Instagram";
import Twitter from "../icons/socials/Twitter";
import Youtube from "../icons/socials/Youtube";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container-md flex-between">
        <p>
          © Version Rebuilt and Improved by <span>Mohamed Tamer</span>
        </p>

        <div className="socials flex-center">
          <a
            style={{
              backgroundColor: "#1558F6",
            }}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Our Facebook Page">
            <Facebook />
          </a>

          <a
            style={{
              backgroundColor: "#00B5FC",
            }}
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Our Twitter Page">
            <Twitter />
          </a>

          <a
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #f9ce34, #ee2a7b, #6228d7)",
            }}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Our Instagram Page">
            <Instagram />
          </a>

          <a
            style={{
              backgroundColor: "#D40009",
            }}
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Our Youtube Page">
            <Youtube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
