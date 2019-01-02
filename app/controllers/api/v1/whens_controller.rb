class Api::V1::WhensController < ApplicationController
  before_action :find_when, only: [:show, :update, :locations, :events]
  def index
    @whens = When.all
    render json: @whens
  end

  def show
    render json: @when
  end

  def locations
    render json: @when.locations
  end

  def events
    @location = Location.find(params[:location_id])
    @events = Event.select {|event| event.when == @when && event.location == @location}
    render json: @events
  end

  def create
    @when = When.new(when_params)
    if @when.save
      render json: @when, status: :accepted
    else
      render json: { errors: @when.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @when.update(when_params)
    if @when.save
      render json: @when, status: :accepted
    else
      render json: { errors: @when.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def when_params
    params.permit(:date)
  end

  def find_when
    @when = When.find(params[:id])
  end
end
