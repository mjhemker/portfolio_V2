import React from 'react';
import styled from 'styled-components';

const VimeoContainer = styled.div<{ $aspectRatio?: string }>`
  padding-bottom: ${props => props.$aspectRatio || '56.25%'};
  position: relative;
  height: 0;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

interface VimeoEmbedProps {
  videoId: string;
  title?: string;
  aspectRatio?: string; // e.g., "56.25%" for 16:9, "75%" for 4:3
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showTitle?: boolean;
  showByline?: boolean;
  showPortrait?: boolean;
  showBadge?: boolean;
  color?: string; // Hex color without #
  className?: string;
  style?: React.CSSProperties;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({
  videoId,
  title = 'Vimeo video',
  aspectRatio = '56.25%',
  autoplay = false,
  loop = false,
  muted = false,
  showTitle = false,
  showByline = false,
  showPortrait = false,
  showBadge = false,
  color,
  className,
  style
}) => {
  // Build Vimeo embed URL with parameters
  const embedParams = new URLSearchParams({
    title: showTitle ? '1' : '0',
    byline: showByline ? '1' : '0',
    portrait: showPortrait ? '1' : '0',
    badge: showBadge ? '1' : '0',
    autopause: '0',
    player_id: '0',
    app_id: '58479'
  });

  if (autoplay) embedParams.set('autoplay', '1');
  if (loop) embedParams.set('loop', '1');
  if (muted) embedParams.set('muted', '1');
  if (color) embedParams.set('color', color);

  const embedUrl = `https://player.vimeo.com/video/${videoId}?${embedParams.toString()}`;

  return (
    <VimeoContainer 
      $aspectRatio={aspectRatio} 
      className={className}
      style={style}
    >
      <iframe
        src={embedUrl}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    </VimeoContainer>
  );
};

export default VimeoEmbed;