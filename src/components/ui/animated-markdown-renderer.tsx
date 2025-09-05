"use client";

import React, { useEffect, useState } from 'react';
import { motion, stagger, useAnimate } from "motion/react";
import { marked } from 'marked';
import { cn } from "../../lib/utils";

interface AnimatedMarkdownRendererProps {
  content: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export const AnimatedMarkdownRenderer: React.FC<AnimatedMarkdownRendererProps> = ({ 
  content, 
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(true);

  // Configure marked options for better formatting
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true,    // GitHub Flavored Markdown
  });

  // Convert markdown to HTML
  const getMarkdownText = () => {
    const rawMarkup = marked.parse(content) as string;
    return { __html: rawMarkup };
  };

  // Split content into words for animation
  const wordsArray = content.split(" ");

  useEffect(() => {
    if (isAnimating) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.1),
        }
      ).then(() => {
        // After animation completes, switch to markdown rendering
        setTimeout(() => setIsAnimating(false), 200);
      });
    }
  }, [scope.current, isAnimating, animate, filter, duration]);

  const renderAnimatedWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  const defaultClassName = `
    prose prose-sm max-w-none
    [&>p]:mb-2 [&>p]:leading-relaxed
    [&>ul]:mb-2 [&>ul]:pl-4 [&>ul]:space-y-1
    [&>li]:list-disc [&>li]:ml-0
    [&>strong]:font-semibold [&>strong]:text-foreground
    [&>em]:italic
    [&>h1]:text-lg [&>h1]:font-semibold [&>h1]:mb-2
    [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2
    [&>h3]:text-sm [&>h3]:font-semibold [&>h3]:mb-1
    [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm
    [&>pre]:bg-muted [&>pre]:p-3 [&>pre]:rounded [&>pre]:overflow-x-auto
    text-muted-foreground
  `;

  if (isAnimating) {
    return (
      <div className={cn("text-base leading-relaxed", className)}>
        {renderAnimatedWords()}
      </div>
    );
  }

  return (
    <div 
      className={`${defaultClassName} ${className || ''}`}
      dangerouslySetInnerHTML={getMarkdownText()} 
      style={{
        lineHeight: '1.6',
      }}
    />
  );
};
