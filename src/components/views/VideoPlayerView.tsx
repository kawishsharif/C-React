import React, { useState, useRef } from 'react';
import placeholderVideo from '../../assets/placeholder.mp4';
import placeholderImage from '../../assets/Images/placeholder.jpg';

interface VideoPlayerViewProps {
  videoUrl?: string;
}

const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({ videoUrl = placeholderVideo }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update time display
  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Load metadata
  const handleLoadMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const seekTime = Number(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="video-player" style={{ 
      maxWidth: '640px', 
      margin: '0 auto',
      backgroundColor: '#0d111d', // Matches MaterialDesignBackground color
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'relative', 
        backgroundColor: '#000', 
        borderRadius: '8px 8px 0 0', 
        overflow: 'hidden',
        width: '100%',
        height: '360px' // Exact height as in WPF
      }}>
        {/* Video element with poster (placeholder image) */}
        <video 
          ref={videoRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '8px 8px 0 0',
            objectFit: 'contain',
            backgroundColor: '#000' 
          }}
          onTimeUpdate={updateTime}
          onLoadedMetadata={handleLoadMetadata}
          poster={placeholderImage}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Play/Pause overlay button (matching WPF design) */}
        <button 
          onClick={togglePlay}
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            backgroundColor: 'rgba(42, 42, 42, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '28px', // Matches WPF button size
            height: '28px', // Matches WPF button size
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'white',
            padding: 0,
            zIndex: 5
          }}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        {/* Current time display - exactly matching WPF implementation */}
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '15px', 
          fontSize: '12px', 
          color: 'white', 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          padding: '3px 8px', 
          borderRadius: '3px',
          fontFamily: 'Segoe UI, sans-serif',
          letterSpacing: '0.5px'
        }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      
      {/* Video timeline control (matching WPF VideoControl exactly) */}
      <div style={{ 
        height: '35px', 
        backgroundColor: '#171b26', // Exact match to WPF's MaterialDesignControlBackground color
        borderRadius: '0 0 8px 8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px', // Exact padding from WPF
        margin: 0
      }}>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{ 
            width: '100%', 
            backgroundColor: 'transparent',
            appearance: 'none',
            height: '4px',
            borderRadius: '4px', // Exact match to WPF slider thickness
            outline: 'none',
            opacity: '1',
            transition: 'opacity 0.2s',
            cursor: 'pointer',
            // Custom range styling to exactly match WPF's slider appearance
            background: `linear-gradient(to right, #3f8fff 0%, #3f8fff ${(currentTime / (duration || 1) * 100)}%, #555 ${(currentTime / (duration || 1) * 100)}%, #555 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayerView;
