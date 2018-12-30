class Api::V1::LocationsController < ApplicationController
  before_action :find_location, only: [:update]
  def index
    @locations = Location.all
    render json: @locations
  end

  def update
    @location.update(location_params)
    if @location.save
      render json: @location, status: :accepted
    else
      render json: { errors: @location.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def location_params
    params.permit(:city, :state)
  end

  def find_location
    @location = Location.find(params[:id])
  end
end
