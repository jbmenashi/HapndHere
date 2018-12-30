class Api::V1::EventsController < ApplicationController
  before_action :find_event, only: [:update]
  def index
    @events = Event.all
    render json: @events
  end

  def update
    @event.update(event_params)
    if @event.save
      render json: @event, status: :accepted
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def event_params
    params.permit(:city, :state)
  end

  def find_event
    @event = Event.find(params[:id])
  end
end
