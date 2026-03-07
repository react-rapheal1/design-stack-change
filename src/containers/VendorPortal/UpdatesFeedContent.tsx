/* eslint-disable */
// @ts-nocheck
import React from "react";
import { activityFeed } from "./activityFeed";

function UpdatesFeedContent() {
  return (
    <div className="flex flex-col">
      {" "}
      {activityFeed.map((item, i) => (
        <React.Fragment key={i}>
          {" "}
          {i > 0 && <hr className="h-px w-full border-0 bg-border-secondary" />}{" "}
          <div className="-mx-3 flex cursor-pointer gap-3 px-3 py-3 transition duration-100 ease-linear hover:bg-secondary">
            {" "}
            <div className="flex flex-1 flex-col gap-3">
              {" "}
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center gap-2">
                  {" "}
                  <span className="text-sm font-medium text-secondary">
                    {" "}
                    {item.type} {item.id}{" "}
                  </span>{" "}
                  <span className="text-xs text-tertiary">{item.time}</span>{" "}
                </div>{" "}
                <p className="text-sm text-tertiary">
                  {" "}
                  Note from <span className="font-medium text-brand-secondary">Rayda</span>{" "}
                </p>{" "}
              </div>{" "}
              <div className="rounded-tr-lg rounded-br-lg rounded-bl-lg border border-secondary p-3 shadow-xs">
                {" "}
                <p className="text-sm text-secondary">{item.message}</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-1 size-2 shrink-0 rounded-full bg-brand-solid" />{" "}
          </div>{" "}
        </React.Fragment>
      ))}{" "}
    </div>
  );
}
export { UpdatesFeedContent };
