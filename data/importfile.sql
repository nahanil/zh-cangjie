-- Create SQLite database for zh-cangjie
--
-- This script expects the input file to be TAB DELIMITED with the following fields
-- which can be pulled from the datavase for cjk-unihan
--
-- character|kCangjie|kFrequency|substr(kFenn-1)
--
-- kFenn *MAY* be an asterix. If it is, leave it blank.
--
-- This feels longer than it needs to be.. I'm cleary no SQL expert, but works as
-- I expected it to.
BEGIN TRANSACTION;

create temporary table temp (
  character text,
  cangjie   text,
  freq      integer,
  fenn      integer
);

.separator "\t" 
.import cangjie.out temp
--.headers on 
--.mode column 

-- Add a column for our averaged frequency. Could do with some more thought here
alter table temp add column frequency integer;

-- kFrequency is 1-5, fenn frequency is 1-11(ish)
-- Halve the fenn frequency if the other doesn't exist
update temp set fenn = cast( (fenn / 2) as int ) where fenn <> '';

-- Now create an average of the two frequencies which we'll use from the script
update temp set frequency = freq where fenn = ''  and freq <> '';
update temp set frequency = fenn where fenn <> '' and freq = '';
update temp set frequency = cast( ((freq + fenn) / 2) as int) where freq <> '' 
    and fenn <> '';
update temp set frequency = 6 where coalesce(frequency, '') = '';

-- Tidy up
CREATE TABLE cangjie (
  character text,
  cangjie   text,
  frequency integer
);

INSERT INTO cangjie 
  SELECT character, cangjie, frequency 
  FROM temp;

DROP TABLE temp;

COMMIT;
