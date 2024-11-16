import React from "react";

export default function LoaderImage({ src }) {
  return src.replace("http://", "https://");
}
