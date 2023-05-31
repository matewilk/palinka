import React, { useState, useEffect } from "react";
import { TextInput, ScrollView } from "react-native";
import { DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";

interface TextractResultsProps {
  results: DetectDocumentTextCommandOutput;
}

const TextractResults: React.FC<TextractResultsProps> = ({ results }) => {
  const [textLines, setTextLines] = useState<string[]>([]);

  useEffect(() => {
    setTextLines(parseTextractResults(results));
  }, [results]);

  return (
    <ScrollView>
      {textLines.map((paragraph, index) => (
        <TextInput
          key={index}
          multiline
          editable={true}
          value={`${paragraph}\n`} // Adding new line at the end
          className="p-0"
        />
      ))}
    </ScrollView>
  );
};

const parseTextractResults = (results: DetectDocumentTextCommandOutput) => {
  if (!results?.Blocks) return [];

  const lineBlocks = results.Blocks.filter(
    (block) => block.BlockType === "LINE",
  );

  if (!lineBlocks || lineBlocks.length === 0) return [];

  lineBlocks.sort(
    (a, b) =>
      (a.Geometry?.BoundingBox?.Top || 0) - (b.Geometry?.BoundingBox?.Top || 0),
  );

  const averageLineHeight =
    lineBlocks.reduce(
      (acc, block) => acc + (block.Geometry?.BoundingBox?.Height || 0),
      0,
    ) / lineBlocks.length;

  const paragraphs: string[] = [""];
  lineBlocks.forEach((block, i) => {
    if (i > 0) {
      const prevBlock = lineBlocks[i - 1];
      const prevTop = (prevBlock && prevBlock.Geometry?.BoundingBox?.Top) || 0;
      const currentTop = block.Geometry?.BoundingBox?.Top || 0;
      if (
        prevTop &&
        currentTop &&
        currentTop - prevTop > 1.5 * averageLineHeight
      ) {
        paragraphs.push("");
      }
    }
    if (block.Text) {
      paragraphs[paragraphs.length - 1] += block.Text + " ";
    }
  });

  return paragraphs;
};

export default TextractResults;
