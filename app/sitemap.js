export default function sitemap(){const base=process.env.SITE_URL||"http://localhost:3000";return ["","/laptops","/repair","/contact"].map(path=>({url:`${base}${path}`,lastModified:new Date()}));}
