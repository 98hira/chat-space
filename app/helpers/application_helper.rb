module ApplicationHelper
  def time_stamp_format(time)
    return time.strftime("%Y/%m/%d %H:%M")
  end
end
