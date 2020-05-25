

const linkResolver = ({ node, key, value }) => doc => {
    // Your link resolver

    const prefix = (doc.lang === "en-gb") ? "" : "/" + doc.lang
    // console.log("linkResolver");
    // console.log(JSON.stringify(doc, null, "  "))
    switch(doc.type) {
      case "homepage": return prefix + '/';
      case "about": return prefix + "/about";
      case "contact": return prefix + "/contact";
      case "blog_post": return prefix + `/blog/${doc.uid}`;
      default: return "/";
    }
    
  };

  module.exports = linkResolver