#!/bin/bash

#SBATCH --qos=short
#SBATCH --job-name=maxparc
#SBATCH --account=gane
#SBATCH --output=maxparc-%j.out
#SBATCH --error=maxparc-%j.err
#SBATCH --workdir=/p/projects/ou/labs/gane/maxparc/paper_revision/results

#SBATCH --array=1-750
#SBATCH --time=12:00:00

module load anaconda/2020.11
source activate /p/projects/ou/labs/gane/maxparc/paper_revision/conda_env

cd /p/projects/ou/labs/gane/maxparc/paper_revision/results
python -u /p/projects/ou/labs/gane/maxparc/paper_revision/vodle/agent-based_simulations/src/maxparc_paper_simulations.py
