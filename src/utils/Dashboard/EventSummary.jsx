import React from "react";
import { useFetchResponses } from "@/api/ResponseApi";
import { FaStarHalfAlt } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import Star from "../../assets/Icons/Star.svg";
import StarColored from "../../assets/Icons/StarColored.svg";

const EventSummary = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div className="text-red-500">Error fetching data</div>;

  // Filter event responses
  const events = responses.filter((response) => response.formType === "event");

  // Calculate satisfaction (radio button responses)
  const satisfactionResponses = events.flatMap((event) =>
    event.data
      .filter(
        (field) => field.type === "radio" && field.label.includes("satisfied")
      )
      .map((field) => {
        switch (field.value) {
          case "Very satisfied":
            return 5;
          case "Satisfied":
            return 4;
          case "Neutral":
            return 3;
          case "Dissatisfied":
            return 2;
          case "Very dissatisfied":
            return 1;
          default:
            return 0;
        }
      })
  );

  const totalSatisfaction = satisfactionResponses.length;
  const averageSatisfaction =
    totalSatisfaction > 0
      ? satisfactionResponses.reduce((sum, rating) => sum + rating, 0) /
        totalSatisfaction
      : 0;

  // Calculate service ratings (rating responses)
  const serviceRatings = events.flatMap((event) =>
    event.data
      .filter((field) => field.type === "rating")
      .map((field) => Number(field.value))
  );

  const totalServiceRatings = serviceRatings.length;
  const averageServiceRating =
    totalServiceRatings > 0
      ? serviceRatings.reduce((sum, rating) => sum + rating, 0) /
        totalServiceRatings
      : 0;

  // Calculate overall rating
  const overallRating = (
    (averageSatisfaction + averageServiceRating) /
    2
  ).toFixed(1);

  // Render stars for ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const fractionStar = rating - fullStars > 0;

    return (
      <div className="flex gap-1 items-center">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="relative">
            {index < fullStars ? (
              <span className="text-bulb-yellow">
                <img src={StarColored} alt="Colored Star" />
              </span>
            ) : index === fullStars && fractionStar ? (
              <span className="text-bulb-yellow">
                <FaStarHalfAlt size={16} />
              </span>
            ) : (
              <span className="text-[#ACABAB]">
                <img src={Star} alt="Star" />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-bulb-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 gap-8">
        {/* Satisfaction */}
        <div className="flex justify-between items-center">
          <h2 className="text-[16px] text-[#29292A]">Satisfaction</h2>
          {renderStars(averageSatisfaction)}
        </div>

        {/* Service Rating */}
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-[16px] text-[#29292A]">Service Rating</h2>
          {renderStars(averageServiceRating)}
        </div>
        <hr className="text-[#9D9D9D]" />

        {/* Overall Rating */}
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-normal text-[#29292A]">
            Overall Rating
          </h2>
          <span className="text-lg font-bold text-[#13162D]">
            {overallRating}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
