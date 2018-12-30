class Api::V1::WhensController < ApplicationController
  before_action :find_when, only: [:show, :update]
  def index
    @whens = When.all
    render json: @whens
  end

  def show
    render json: @when
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
