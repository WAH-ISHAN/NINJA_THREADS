import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    //superbase eke api key eka denna ona
    "https://epwiophmwcznuyrsyeqv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwd2lvcGhtd2N6bnV5cnN5ZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTk4NDYsImV4cCI6MjA2Mjc3NTg0Nn0.5LMe1NG7QOHU73lMadWSd045EHrl5R1F5b1msWoDBYk"
  );


export default function uploadMedia(file) {

const promise = new Promise(
    (resolve,rejects)=>{
        if(file ==null){
            rejects("No file selected");
        }
        const timeStamp = new Date().getTime();
        const newFileName = timeStamp + file.name;

        supabase.storage
      .from("img")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,


    }).then(
        ()=> {
             const url = supabase.storage
            .from("img").getPublicUrl(newFileName).data.publicUrl
            resolve(url);
        }
    ).catch((err) => {
        rejects("Error uploading file");
        console.error(err);
      })

})
return promise;
}
 