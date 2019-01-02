class Api::V1::EventsController < ApplicationController
  before_action :find_event, only: [:show, :update]
  def index
    @events = Event.all
    render json: @events
  end

  def show
    render json: @event
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :accepted
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessible_entity
    end
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
    params.permit(:location_id, :when_id, :title, :info, :img_url)
  end

  def find_event
    @event = Event.find(params[:id])
  end
end
