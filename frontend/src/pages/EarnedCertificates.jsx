// Display all certificates fetch NFTs via NFTPort
import React, { useState } from "react";

function EarnedCertificates() {
  const [certificates, setCertificates] = useState([]);

  const datafromGraph = [
    { certificateHash: "", projectId: "" },
    { certificateHash: "", projectId: "" },
    { certificateHash: "", projectId: "" },
  ];
  return (
    <div
      style={{
        backgroundImage: `url(https://www.plasticstoday.com/sites/plasticstoday.com/files/styles/article_featured_standard/public/awards-d1sk-Adobe-1540x800.jpg?itok=Mgg294rp)`,
      }}
      className="vh-100 text-center"
    >
      <h1 className="text-white pt-3">HALL OF FAME</h1>
    </div>
  );
}
export default EarnedCertificates;
