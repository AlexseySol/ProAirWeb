import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionContainer = styled.section`
  padding: 30px 20px;
  background: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
`;

const ReviewCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(138, 43, 226, 0.1));
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.1);
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  height: 0;
  overflow: hidden;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const ReviewerInfo = styled.div`
  padding: 15px;
`;

const ReviewerName = styled.h4`
  font-size: 1em;
  color: var(--primary-color);
  margin-bottom: 5px;
`;

const ReviewerPosition = styled.p`
  font-size: 0.8em;
  color: var(--secondary-color);
`;

const reviews = [
  {
    videoId: "FsAvaQfcerk",
    name: "Студент",
    position: "Майбутній професіонал",
  },
  {
    videoId: "YwydwjYvL-U",
    name: "Підприємець",
    position: "Власник бізнесу",
  },
  {
    videoId: "5XdG_fcq3gM",
    name: "СММ",
    position: "Спеціаліст з соціальних медіа",
  },
  {
    videoId: "Hm0TCrr1VlM",
    name: "Помічник керівника",
    position: "Адміністративний асистент",
  },
  {
    videoId: "7HaaXo7an5M",
    name: "Технічний спеціаліст",
    position: "IT-професіонал",
  }
];

const ReviewsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Відгуки наших студентів
      </Title>
      <StyledSlider {...settings}>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <VideoContainer>
              <Video
                src={`https://www.youtube.com/embed/${review.videoId}`}
                title={`${review.name} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
            <ReviewerInfo>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewerPosition>{review.position}</ReviewerPosition>
            </ReviewerInfo>
          </ReviewCard>
        ))}
      </StyledSlider>
    </SectionContainer>
  );
};

export default ReviewsSection;